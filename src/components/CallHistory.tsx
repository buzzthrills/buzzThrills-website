import React, { useEffect, useState } from "react";
import type { Recipient } from "../utils/type";
import { apiRequest } from "../utils/apiRequest";

type CallHistoryItem = Recipient & {
    status: string;
};

const CallHistory: React.FC = () => {
    const [calls, setCalls] = useState<CallHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCallHistory = async () => {
        setLoading(true);

        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            console.error("❌ No user in localStorage");
            setLoading(false);
            return;
        }

        const userId = JSON.parse(storedUser)._id;

        if (!userId) {
            console.error("❌ User ID missing");
            setLoading(false);
            return;
        }

        const res = await apiRequest<{ calls: any[] }>(
            `/user_dashboard/call-history/${userId}`,
            { method: "GET" }
        );

        if (res.success && res.data?.calls) {
            const formatted: CallHistoryItem[] = res.data.calls.map((c) => ({
                name: c.recipient?.name ?? "",
                phone: c.recipient?.phone ?? "",
                relationship: c.recipient?.relationship ?? "", // ✅ REQUIRED
                occasionType: c.recipient?.occasionType ?? "",
                date: c.recipient?.date ?? "",
                time: c.recipient?.time ?? "",
                callType: c.recipient?.callType ?? "",
                status: c.status.charAt(0).toUpperCase() + c.status.slice(1),
            }));


            setCalls(formatted);
        }

        setLoading(false);
    };



    useEffect(() => {
        fetchCallHistory();
    }, []);

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Call History</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading call history...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-gray-600 font-medium">Name</th>
                                <th className="px-4 py-2 text-gray-600 font-medium">Phone</th>
                                <th className="px-4 py-2 text-gray-600 font-medium">Occasion</th>
                                <th className="px-4 py-2 text-gray-600 font-medium">
                                    Date & Time
                                </th>
                                <th className="px-4 py-2 text-gray-600 font-medium">Call Type</th>
                                <th className="px-4 py-2 text-gray-600 font-medium">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {calls.map((call, idx) => (
                                <tr
                                    key={idx}
                                    className={`border-b transition hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                >
                                    <td className="px-4 py-2 text-gray-700">{call.name}</td>
                                    <td className="px-4 py-2 text-gray-700">{call.phone}</td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {call.occasionType}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {call.date} {call.time}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">{call.callType}</td>

                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-sm font-semibold ${call.status === "Completed"
                                                ? "bg-green-100 text-green-800"
                                                : call.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {call.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {calls.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-gray-500"
                                    >
                                        No calls booked yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CallHistory;
