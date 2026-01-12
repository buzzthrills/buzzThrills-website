import type { Recipient } from "../utils/type";
import { Calendar, Phone, User, Clock } from "lucide-react";

const SummaryStep = ({ recipients }: { recipients: Recipient[] }) => {
  const validRecipients = recipients.filter(r => r?.name);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Booking Summary</h2>
        <p className="text-sm text-gray-500 mt-1">
          Review recipient details before confirming your booking.
        </p>
      </div>

      {/* Empty State */}
      {validRecipients.length === 0 && (
        <div className="p-6 border border-dashed rounded-xl text-center text-gray-500">
          No recipients added yet.
        </div>
      )}

      {/* Recipient Cards */}
      <div className="grid gap-4 max-h-[60vh] overflow-y-auto">
        {validRecipients.map((r, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white shadow-sm p-5
                       hover:shadow-md transition"
          >
            {/* Name */}
            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-purple-600" />
              <h3 className="font-semibold text-gray-900">{r.name}</h3>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <span>{r.phone || "—"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span>{r.callType || "—"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span>{r.date || "—"}</span>
              </div>

              {r.time && (
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span>{r.time}</span>
                </div>
              )}
            </div>

            {/* Message */}
            {r.message && (
              <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                <span className="font-medium text-gray-800">Message:</span>{" "}
                {r.message}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryStep;
