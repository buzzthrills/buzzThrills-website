import React, { useEffect, useState } from "react";
import { User, Phone, Calendar } from "lucide-react";
import { apiRequest } from "../utils/apiRequest";

type RecipientType = {
  recipient: {
    name: string;
    phone: string;
    relationship?: string;
    occasionType?: string;
  };
  status: string;
  scheduledFor?: string;
};

const Recipients: React.FC = () => {
  const [recipients, setRecipients] = useState<RecipientType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipients = async () => {
      const token = localStorage.getItem("auth-token");

      const res = await apiRequest("/user_dashboard/my_recipients", {
        method: "POST",
        body: { token },
        showLoader: false,
      });

      console.log(res); // 🔍 for debugging

      if (res.success && Array.isArray(res.data?.data)) {
        setRecipients(res.data.data); // ✅ correct path
      }

      setLoading(false);
    };

    fetchRecipients();
  }, []);



  if (loading) {
    return <div className="text-center py-20">Loading recipients...</div>;
  }

  if (!recipients.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        You haven’t booked any calls yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Recipients / Participants
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipients.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-2xl shadow hover:shadow-xl transition"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center border-2 border-purple-400">
                <User size={22} className="text-purple-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {item.recipient.name}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {item.recipient.relationship || "Recipient"}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                <Phone size={14} /> {item.recipient.phone}
              </p>

              {item.recipient.occasionType && (
                <p className="flex items-center gap-2">
                  <Calendar size={14} /> {item.recipient.occasionType}
                </p>
              )}

              <p className="text-xs mt-2">
                Status:{" "}
                <span className="font-semibold capitalize">
                  {item.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipients;
