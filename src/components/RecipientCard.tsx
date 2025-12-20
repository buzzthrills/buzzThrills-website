import React from "react";
import { motion } from "framer-motion";
import type { Recipient } from "../utils/type";

type Props = {
    index: number;
    recipient: Recipient;
    callTypes: string[];
    onChange: (field: keyof Recipient, value: string) => void;
};

const RecipientCard: React.FC<Props & { className?: string }> = ({ index, recipient, callTypes, onChange, className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-md border border-gray-200 rounded-2xl p-6 space-y-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
        >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Recipient {index + 1}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    className="input rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    placeholder="Name"
                    value={recipient.name}
                    onChange={e => onChange("name", e.target.value)}
                />
                <input
                    className="input rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    placeholder="Phone"
                    value={recipient.phone}
                    onChange={e => onChange("phone", e.target.value)}
                />
                <input
                    className="input rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    placeholder="Relationship"
                    value={recipient.relationship}
                    onChange={e => onChange("relationship", e.target.value)}
                />
                <input
                    type="date"
                    className="input rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    value={recipient.date}
                    onChange={e => onChange("date", e.target.value)}
                />
                <input
                    type="time"
                    className="input rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    value={recipient.time}
                    onChange={e => onChange("time", e.target.value)}
                />
                <select
                    className="input rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    value={recipient.callType}
                    onChange={e => onChange("callType", e.target.value)}
                >
                    <option value="">Select Call Type</option>
                    {callTypes.map(t => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
            </div>

            <textarea
                className="input w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none transition min-h-[80px]"
                placeholder="Message"
                value={recipient.message}
                onChange={e => onChange("message", e.target.value)}
            />
        </motion.div>
    );
};

export default RecipientCard;
