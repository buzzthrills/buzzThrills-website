import React from "react";
import { User } from "lucide-react";

const Recipients: React.FC = () => {
  // Placeholder participants
  const participants = Array.from({ length: 6 }, (_, i) => `Participant ${i + 1}`);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Recipients / Participants</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {participants.map((name, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center border-2 border-purple-400">
              <User size={24} className="text-purple-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{name}</p>
              <p className="text-gray-500 text-sm">Placeholder info</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipients;
