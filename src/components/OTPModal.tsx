import React, { useState } from "react";
import OTPInput from "./OTPInput";
// import ModalWrapper from "./ModalWrapper";
// import ModalWrapper from "./ModalWrapper";

interface OTPModalProps {
  show: boolean;
  onClose: () => void;
  amount: number;
  onVerify: (otp: string) => void;
}

const OTPModal: React.FC<OTPModalProps> = ({ show, onClose,  onVerify }) => {
  const [isError] = useState(false);

  if (!show) return null;

  const handleComplete = (enteredOtp: string) => {
    if (enteredOtp.length === 6) { // assuming 6 digit OTP
      onVerify(enteredOtp);
    }
  };

  return (
      <div className=" inset-0 z-50 flex justify-center items-center bg-white">
        <div className=" rounded-xl  p-6 w-96 max-w-[90%]">
          <h2 className="text-xl font-semibold mb-3 text-center">Confirm Deposit</h2>
          <p className="text-center text-gray-700 mb-5">
            Enter the OTP sent to your email to login to your dashboard.
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
  );
};

export default OTPModal;
