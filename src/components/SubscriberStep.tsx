import React, { useEffect } from "react";
import { motion } from "framer-motion";

type SubscriberData = {
    fullName: string;
    email: string;
    phone: string;
};

type Props = {
    data: SubscriberData; // required
    onChange: (data: SubscriberData) => void;
};

const SubscriberStep: React.FC<Props> = ({ data, onChange }) => {
    // Defensive check
    const subscriberData: SubscriberData = data || {
        fullName: "",
        email: "",
        phone: "",
    };

    // Prefill email from local storage
    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            if (user?.email && user.email !== subscriberData.email) {
                onChange({ ...subscriberData, email: user.email });
            }
        } catch (err) {
            console.warn("Failed to parse user from localStorage", err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6"
        >
            <h2 className="text-2xl font-bold text-gray-800 text-center">
                Subscriber Information
            </h2>

            {/* Full Name */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Full Name</label>
                <input
                    type="email"
                    value={subscriberData?.email || ""} // fallback added
                    readOnly
                    placeholder="Enter email"
                    className="px-4 py-3 border rounded-lg border-gray-300 bg-gray-100 cursor-not-allowed"
                />

            </div>

            {/* Email */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={subscriberData.email}
                    readOnly
                    placeholder="Enter email"
                    className="px-4 py-3 border rounded-lg border-gray-300 bg-gray-100 cursor-not-allowed"
                />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Phone</label>
                <input
                    type="tel"
                    value={subscriberData?.phone || ""} // fallback added
                    onChange={(e) =>
                        onChange({ ...subscriberData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                    className="px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:shadow-sm transition-shadow duration-200"
                />
            </div>
        </motion.div>
    );
};

export default SubscriberStep;
