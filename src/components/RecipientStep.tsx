import React, { useState, useEffect } from "react";
import { getCallTypesByPlan } from "../utils/helper";
import type { Recipient } from "../utils/type";
import RecipientCard from "./RecipientCard";
import { motion } from "framer-motion";
import { Plus, Download } from "lucide-react";

type Props = {
  recipients: Recipient[];
  setRecipients: React.Dispatch<React.SetStateAction<Recipient[]>>;
  planKey: string;
  maxCalls: number;
  onCSVUpload: (file: File) => void;
};

const LOCAL_STORAGE_KEY = "savedRecipients";

const RecipientStep: React.FC<Props> = ({ recipients, setRecipients, planKey, maxCalls, onCSVUpload }) => {
  const [mode, setMode] = useState<"csv" | "manual">("manual");
  const [currentIndex, setCurrentIndex] = useState(0);
  const callTypes = getCallTypesByPlan(planKey);
  const [savedRecipients, setSavedRecipients] = useState<Recipient[]>([]);

  // Load saved recipients from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed: Recipient[] = JSON.parse(stored);
      setSavedRecipients(parsed);
      setRecipients(prev => {
        const filled = [...prev];
        parsed.forEach((rec, i) => {
          if (i < filled.length) filled[i] = rec;
        });
        return filled;
      });
    }
  }, []);

  const isRecipientValid = (r?: Recipient) => {
    if (!r) return false;
    return (
      r.name.trim() !== "" &&
      r.phone.trim() !== "" &&
      r.callType.trim() !== ""
    );
  };


  const saveRecipient = () => {
    const current = recipients[currentIndex];

    if (!isRecipientValid(current)) {
      alert("Please fill at least Name, Phone, and Call Type before saving.");
      return;
    }

    setSavedRecipients(prev => {
      const copy = [...prev];
      copy[currentIndex] = current;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(copy)); // store in localStorage
      return copy;
    });

    // Move to next card if not last
    if (currentIndex < maxCalls - 1) setCurrentIndex(currentIndex + 1);
  };

  const updateRecipient = (field: keyof Recipient, value: string) => {
    setRecipients(prev => {
      const copy = [...prev];
      copy[currentIndex] = { ...copy[currentIndex], [field]: value };
      return copy;
    });
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex gap-4">
        <div
          onClick={() => setMode("csv")}
          className={`flex-1 cursor-pointer p-4 rounded-lg border transition ${mode === "csv" ? "bg-blue-500 text-white border-blue-500" : "bg-white border-gray-300"
            }`}
        >
          <h3 className="font-semibold flex items-center gap-2">
            <Download size={18} /> Upload CSV
          </h3>
          <p className="text-sm mt-1 text-gray-600">Use a CSV file of recipients based on your subscription.</p>
        </div>
        <div
          onClick={() => setMode("manual")}
          className={`flex-1 cursor-pointer p-4 rounded-lg border transition ${mode === "manual" ? "bg-blue-500 text-white border-blue-500" : "bg-white border-gray-300"
            }`}
        >
          <h3 className="font-semibold flex items-center gap-2">
            <Plus size={18} /> Manual Entry
          </h3>
          <p className="text-sm mt-1 text-gray-600">Type recipient details manually and add more if needed.</p>
        </div>
      </div>

      {/* CSV Upload */}
      {mode === "csv" && (
        <div className="border border-dashed border-gray-300 rounded-2xl p-6 text-center bg-white shadow-sm flex flex-col items-center gap-4">
          <Download size={32} className="text-gray-400" />
          <p className="text-gray-600">Click or drag a CSV file here to upload recipients.</p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => e.target.files && onCSVUpload(e.target.files[0])}
            className="cursor-pointer"
          />
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Download CSV Template
          </button>
        </div>
      )}

      {/* Manual Entry Stepper */}
      {mode === "manual" && (
        <div className="relative">
          <p className="text-gray-500 text-sm mb-2">
            Recipient {currentIndex + 1}/{maxCalls}
          </p>

          <motion.div
            key={currentIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="flex flex-col gap-4"
          >
            <RecipientCard
              index={currentIndex}
              recipient={recipients[currentIndex]}
              callTypes={callTypes}
              onChange={updateRecipient}
            />

            <button
              onClick={saveRecipient}
              disabled={!isRecipientValid(recipients[currentIndex])}
              className={`px-6 btn-secondary py-3 font-semibold rounded-lg self-start transition ${isRecipientValid(recipients[currentIndex])
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Save & Next
            </button>
          </motion.div>

          {/* Already Saved Recipients */}
          {savedRecipients.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-2">Saved Recipients (click to edit)</h4>
              <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
                {savedRecipients.map((rec, idx) => (
                  <motion.div
                    key={idx}
                    className="flex-shrink-0 w-[360px] md:w-[400px] cursor-pointer"
                    onClick={() => setCurrentIndex(idx)}
                  >
                    <RecipientCard
                      index={idx}
                      recipient={rec}
                      callTypes={callTypes}
                      onChange={(field, value) => {
                        setSavedRecipients(prev => {
                          const copy = [...prev];
                          copy[idx] = { ...copy[idx], [field]: value };
                          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(copy)); // update localStorage
                          return copy;
                        });
                        setRecipients(prev => {
                          const copy = [...prev];
                          copy[idx] = { ...copy[idx], [field]: value };
                          return copy;
                        });
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipientStep;
