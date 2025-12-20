import React from "react";

type Props = {
  step: number;
  total: number;
};

const ProgressBar: React.FC<Props> = ({ step, total }) => {
  const percentage = (step / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {step} of {total}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-sm">
        <div
          className="h-3 rounded-full transition-all duration-500 ease-in-out bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
