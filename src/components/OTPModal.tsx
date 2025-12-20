import React, { useState } from "react";
import OTPInput from "./OTPInput";
import ModalWrapper from "./ModalWrapper";
// import ModalWrapper from "./ModalWrapper";

interface OTPModalProps {
  show: boolean;
  onClose: () => void;
  amount: number;
  onVerify: (otp: string) => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ show, onClose, amount, onVerify }) => {
  const [isError] = useState(false);

  if (!show) return null;

  const handleComplete = (enteredOtp: string) => {
    if (enteredOtp.length === 6) { // assuming 6 digit OTP
      onVerify(enteredOtp);
    }
  };

  return (
    <ModalWrapper isOpen={show} onClose={onClose}>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
        <div className="bg-white rounded-xl shadow-xl p-6 w-96 max-w-[90%]">
          <h2 className="text-xl font-semibold mb-3 text-center">Confirm Deposit</h2>
          <p className="text-center text-gray-700 mb-5">
            Enter the OTP sent to your email for <span className="font-bold">N{amount.toLocaleString()}</span> deposit
          </p>

          <OTPInput length={6} onComplete={handleComplete} isError={isError} />

          <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default OTPModal;
