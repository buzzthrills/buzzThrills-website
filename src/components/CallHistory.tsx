import React, { useEffect, useState } from "react";
import { Phone, Calendar, Gift } from "lucide-react";
import { apiRequest } from "../utils/apiRequest";

type CallType = {
  recipient: {
    name: string;
    phone: string;
    relationship?: string;
    occasionType?: string;
    date?: string;
    time?: string;
    callType?: string;
    message?: string;
  };
  status: string;
  scheduledFor?: string;
  bookedAt?: string;
};

const CallHistory: React.FC = () => {
  const [calls, setCalls] = useState<CallType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCallHistory = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const res = await apiRequest("/user_dashboard/my_recipients", {
        method: "POST",
        body: { token },
        showLoader: false,
      });

      if (res.success && Array.isArray(res.data.data)) {
        setCalls(res.data.data);
      }

      setLoading(false);
    };

    fetchCallHistory();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading call history...</div>;
  }

  if (!calls.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No calls booked yet.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Call History</h2>

      <div className="space-y-4">
        {calls.map((call, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md hover:shadow-lg rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              {/* Name & Phone */}
              <div className="flex flex-col">
                <span className="text-gray-800 font-semibold">
                  {call.recipient.name}
                </span>
                <span className="text-gray-500 text-sm">{call.recipient.phone}</span>
              </div>

              {/* Occasion */}
              {call.recipient.occasionType && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Gift size={16} />
                  <span className="text-sm">{call.recipient.occasionType}</span>
                </div>
              )}

              {/* Date & Time */}
              {call.scheduledFor && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">
                    {new Date(call.scheduledFor).toLocaleDateString()}{" "}
                    {new Date(call.scheduledFor).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              )}

              {/* Call Type */}
              {call.recipient.callType && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">{call.recipient.callType}</span>
                </div>
              )}
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full font-semibold text-sm ${
                call.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : call.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              } capitalize`}
            >
              {call.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallHistory;
