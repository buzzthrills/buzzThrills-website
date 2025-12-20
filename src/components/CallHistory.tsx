import React from "react";
import { Phone, Calendar, Gift } from "lucide-react";

const CallHistory: React.FC = () => {
  // Placeholder calls
  const placeholderCalls = Array.from({ length: 5 }, (_, idx) => ({
    name: `Recipient ${idx + 1}`,
    phone: `+234 800 000 000${idx}`,
    occasionType: "Birthday",
    date: "YYYY-MM-DD",
    time: "--:--",
    callType: idx % 2 === 0 ? "Video Call" : "Voice Call",
    status: idx % 3 === 0 ? "Completed" : idx % 3 === 1 ? "Pending" : "Cancelled",
  }));

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Call History</h2>

      {placeholderCalls.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No calls booked yet.
        </div>
      ) : (
        <div className="space-y-4">
          {placeholderCalls.map((call, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md hover:shadow-lg rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
                {/* Name & Phone */}
                <div className="flex flex-col">
                  <span className="text-gray-800 font-semibold">{call.name}</span>
                  <span className="text-gray-500 text-sm">{call.phone}</span>
                </div>

                {/* Occasion */}
                <div className="flex items-center gap-1 text-gray-600">
                  <Gift size={16} />
                  <span className="text-sm">{call.occasionType}</span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">{call.date} {call.time}</span>
                </div>

                {/* Call Type */}
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">{call.callType}</span>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 rounded-full font-semibold text-sm ${
                  call.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : call.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {call.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CallHistory;
