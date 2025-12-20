import React, { useState, useRef, useEffect } from "react";

interface OTPInputProps {
  length?: number;
  onChange?: (otp: string) => void;
  onComplete?: (otp: string) => void;
  isError?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onChange,
  onComplete,
  isError = false,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (el: HTMLInputElement, index: number) => {
    const value = el.value.replace(/[^a-zA-Z0-9]/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange?.(newOtp.join(""));

      if (value && index < length - 1) inputRefs.current[index + 1]?.focus();
      if (newOtp.every((v) => v !== "")) onComplete?.(newOtp.join(""));
    }
  };

  const handleBackspace = (el: HTMLInputElement, index: number) => {
    if (el.value === "" && index > 0) inputRefs.current[index - 1]?.focus();
  };

  return (
    <div className="flex justify-center gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
          onKeyDown={(e) =>
            e.key === "Backspace" &&
            handleBackspace(e.target as HTMLInputElement, index)
          }
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
          className={`w-10 h-10 text-center text-xl border rounded-md outline-none ${
            isError
              ? "border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
