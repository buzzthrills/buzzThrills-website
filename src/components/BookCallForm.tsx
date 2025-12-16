import React, { useState } from "react";
import type { Recipient } from "../utils/type";
import { apiRequest } from "../utils/apiRequest";

type BookCallFormProps = {
  subscriptionId: string; // You need subscriptionId for the backend
};

const BookCallForm: React.FC<BookCallFormProps> = ({ subscriptionId }) => {
  const [step, setStep] = useState(1);
  const [subscriberInfo, setSubscriberInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    contactMethod: "Call",
  });


  const [recipient, setRecipient] = useState<Recipient>({
    name: "",
    phone: "",
    relationship: "",
    occasionType: "",
    date: "",
    time: "",
    callType: "Birthday Call",
    message: "",
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleRecipientChange = (field: keyof Recipient, value: string) => {
    setRecipient(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    try {
      const body = {
        subscriptionId,
        subscriberInfo,
        recipientInfo: recipient,
      };

      const { success, data } = await apiRequest("/user_dashboard/book-call", {
        method: "POST",
        body,
        showSuccess: true,
      });

      if (success) {
        console.log("Call booked:", data);
        setStep(1);
        setSubscriberInfo({
          fullName: "",
          email: "",
          phone: "",
          contactMethod: "Call",
        });
        setRecipient({
          name: "",
          phone: "",
          relationship: "",
          occasionType: "",
          date: "",
          time: "",
          callType: "Birthday Call",
          message: "",
        });
        alert("Call booked successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Progress */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-2 text-gray-700">
          Step {step} of 3
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-[#c804d7] via-[#36014b] to-[#171053]"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 1: Subscriber Info</h2>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c804d7] focus:outline-none"
            placeholder="Full Name"
            value={subscriberInfo.fullName}
            onChange={e => setSubscriberInfo({ ...subscriberInfo, fullName: e.target.value })}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c804d7] focus:outline-none"
            placeholder="Email"
            value={subscriberInfo.email}
            onChange={e => setSubscriberInfo({ ...subscriberInfo, email: e.target.value })}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c804d7] focus:outline-none"
            placeholder="Phone"
            value={subscriberInfo.phone}
            onChange={e => setSubscriberInfo({ ...subscriberInfo, phone: e.target.value })}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 2: Recipient Info</h2>
          <div className="border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c804d7]"
                placeholder="Recipient Name"
                value={recipient.name}
                onChange={e => handleRecipientChange("name", e.target.value)}
              />
              <input
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c804d7]"
                placeholder="Phone"
                value={recipient.phone}
                onChange={e => handleRecipientChange("phone", e.target.value)}
              />
              <input
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c804d7]"
                placeholder="Relationship"
                value={recipient.relationship}
                onChange={e => handleRecipientChange("relationship", e.target.value)}
              />
              <input
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c804d7]"
                placeholder="Occasion Type"
                value={recipient.occasionType}
                onChange={e => handleRecipientChange("occasionType", e.target.value)}
              />
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c804d7]"
                value={recipient.date}
                onChange={e => handleRecipientChange("date", e.target.value)}
              />
              <input
                type="time"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c804d7]"
                value={recipient.time}
                onChange={e => handleRecipientChange("time", e.target.value)}
              />
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#c804d7]"
                value={recipient.callType}
                onChange={e => handleRecipientChange("callType", e.target.value)}
              >
                <option>Birthday Call</option>
                <option>Music Call</option>
                <option>Prank Call</option>
                <option>Apology Call</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Step 3: Summary</h2>
          <div className="border p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Subscriber Info</h3>
            <p><strong>Name:</strong> {subscriberInfo.fullName}</p>
            <p><strong>Email:</strong> {subscriberInfo.email}</p>
            <p><strong>Phone:</strong> {subscriberInfo.phone}</p>

            <h3 className="font-semibold text-gray-700 mt-4 mb-2">Recipient Info</h3>
            <p><strong>Name:</strong> {recipient.name}</p>
            <p><strong>Phone:</strong> {recipient.phone}</p>
            <p><strong>Relationship:</strong> {recipient.relationship}</p>
            <p><strong>Occasion:</strong> {recipient.occasionType}</p>
            <p><strong>Date:</strong> {recipient.date}</p>
            <p><strong>Time:</strong> {recipient.time}</p>
            <p><strong>Call Type:</strong> {recipient.callType}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Back
          </button>
        )}
        <button
          onClick={step < 3 ? handleNext : handleConfirm}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#c804d7] via-[#36014b] to-[#171053] text-white font-semibold hover:scale-105 transform transition"
        >
          {step < 3 ? "Next" : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookCallForm;
