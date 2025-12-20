import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import type { Recipient } from "../utils/type";
import { apiRequest } from "../utils/apiRequest";
import ProgressBar from "./ProgressBar";
import SubscriberStep from "./SubscriberStep";
import RecipientStep from "./RecipientStep";
import SummaryStep from "./SummaryStep";






const BookCallForm: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const planKey = user?.subscription?.plan?.key || "lite";
  const maxCalls =
    user?.subscription?.remainingCalls ??
    user?.subscription?.totalCalls ??
    1;

  const [step, setStep] = useState(1);

  type SubscriberData = {
    fullName: string;
    email: string;
    phone: string;
  };

  const [subscriberInfo, setSubscriberInfo] = useState<SubscriberData>(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return {
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      };
    } catch {
      return { fullName: "", email: "", phone: "" };
    }
  });



  const emptyRecipient: Recipient = {
    name: "",
    phone: "",
    relationship: "",
    occasionType: "",
    date: "",
    time: "",
    callType: "",
    message: "",
  };

  const [recipients, setRecipients] = useState<Recipient[]>([]);

  useEffect(() => {
    setRecipients(
      Array.from({ length: maxCalls }, () => ({ ...emptyRecipient }))
    );
  }, [maxCalls]);

  const handleCSVUpload = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const parsed = (results.data as any[])
          .slice(0, maxCalls)
          .map((row) => ({
            name: row["Recipient Name"] || "",
            phone: row["Phone"] || "",
            relationship: row["Relationship"] || "",
            occasionType: row["Occasion Type"] || "",
            date: row["Occasion Date"] || "",
            time: row["Preferred Time"] || "",
            callType: row["Call Type"] || "",
            message: row["Custom Message"] || "",
          }));

        setRecipients(parsed);
      },
    });
  };

  const handleConfirm = async () => {
    const validRecipients = recipients.filter(
      (r) => r.name && r.phone && r.date
    );

    if (!validRecipients.length) {
      alert("Please fill at least one recipient");
      return;
    }

    await apiRequest("/user_dashboard/book-call", {
      method: "POST",
      body: {
        subscriptionId: user.subscription._id,
        subscriberInfo,
        recipients: validRecipients,
      },
      showSuccess: true,
    });

    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <ProgressBar step={step} total={3} />

      {step === 1 && (
        <SubscriberStep
          data={subscriberInfo}
          onChange={setSubscriberInfo}
        />
      )}

      {step === 2 && (
        <RecipientStep
          recipients={recipients}
          setRecipients={setRecipients}
          planKey={planKey}
          maxCalls={maxCalls}
          onCSVUpload={handleCSVUpload}
        />
      )}

      {step === 3 && <SummaryStep recipients={recipients} />}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition duration-200"
          >
            Back
          </button>
        )}

        <button
          onClick={step < 3 ? () => setStep(step + 1) : handleConfirm}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-semibold rounded-lg shadow hover:scale-105 transform transition duration-200"
        >
          {step < 3 ? "Next" : "Confirm Booking"}
        </button>
      </div>

    </div>
  );
};

export default BookCallForm;
