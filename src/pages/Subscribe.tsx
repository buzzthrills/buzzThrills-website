// src/pages/Subscribe.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type Plan = {
    title: string;
    price: string;
    calls: string;
    overview: string;
    whatsIncluded: string[];
    perks: string[];
    perfectFor: string;
};

const PLANS: Record<string, Plan> = {
    lite: {
        title: "Buzz Lite",
        price: "₦15,000 / month",
        calls: "Up to 12 Surprise Calls monthly",
        overview:
            "Never forget the special moments. Buzz Lite keeps your most important celebrations covered with thoughtful, high-quality surprise calls — all handled for you.",
        whatsIncluded: [
            "Up to 12 heartfelt surprise calls per month",
            "Custom message scripting for every recipient",
            "Access to all BuzzThrills call types (including select premium experiences)",
            "Priority booking when you need an extra or urgent surprise",
            "Flexible scheduling and polite delivery windows",
        ],
        perks: [
            "Ad-ons available (prank, music, custom effects) on request",
            "Best-value starter plan for consistent thoughtfulness",
            "Simple management — we handle call delivery and confirmations",
        ],
        perfectFor:
            "Individuals who want consistent, low-effort thoughtfulness — ideal for people with a handful of monthly celebrations (birthdays, anniversaries, quick check-ins).",
    },

    plus: {
        title: "Buzz Plus",
        price: "₦25,000 / month",
        calls: "Up to 20 Surprise Calls monthly",
        overview:
            "More calls, more love: Buzz Plus is built for months full of occasions — it gives you speed, flexibility and richer call experiences.",
        whatsIncluded: [
            "Up to 20 surprise calls per month",
            "Faster processing and priority slots for peak months",
            "Customizable message templates and tailored scripts",
            "Includes birthday music calls, light prank calls, motivational & romantic calls",
            "Option to add short special instructions per call",
        ],
        perks: [
            "Higher delivery SLA for fast turnarounds",
            "Ideal for multi-recipient months (family, friends, small groups)",
            "Great balance of volume + premium features",
        ],
        perfectFor:
            "Anyone who shows love through steady gestures — great for active social calendars, frequent birthdays, apologies and regular check-ins.",
    },

    orbit: {
        title: "Buzz Orbit",
        price: "₦50,000 / month",
        calls: "30+ Premium Surprise Calls monthly",
        overview:
            "The VIP tier — full-service, premium production and hands-on support. Buzz Orbit gives you unlimited access to our best experiences so you can go big without extra setup.",
        whatsIncluded: [
            "30+ premium personalized calls each month",
            "Unlimited access to ALL premium call experiences (no restrictions)",
            "Custom voice notes (recorded by you or a BuzzThrills host)",
            "Choice of preferred caller/host for consistent voice & tone",
            "Bonus surprise calls every other month and early access to drops",
        ],
        perks: [
            "VIP scheduling & priority customer support",
            "Custom voice & production elements (music beds, sound cues)",
            "Dedicated support contact (optional) for hands-off management",
        ],
        perfectFor:
            "Families, creators, executives or small teams who want high-touch, consistent experiences (influencers, small business owners and VIP households).",
    },

    corporate: {
        title: "Buzz Corporate",
        price: "Custom — from ₦XX,XXX / month",
        calls: "35+ Corporate Calls (minimum)",
        overview:
            "A corporate-grade engagement solution for HR, client relations and people teams. Branded, reliable, and reportable — built to scale across teams and clients.",
        whatsIncluded: [
            "At least 35 corporate-appropriate calls per month (scalable by scope)",
            "Branded messaging and tone customization",
            "Staff birthday & work anniversary reminders",
            "Client appreciation and lead follow-up call types",
            "Monthly performance reports and analytics",
        ],
        perks: [
            "Dedicated account manager",
            "Custom integration options (CSV staff upload, scheduling APIs)",
            "Reporting cadence (weekly/monthly) and configurable delivery windows",
        ],
        perfectFor:
            "Businesses and HR teams that want consistent, branded appreciation — ideal for employee engagement, client retention and executive gifting programs.",
    },
};

const Subscribe: React.FC = () => {
    const [params] = useSearchParams();
    const planKey = params.get("plan") || "";
    const plan = PLANS[planKey as keyof typeof PLANS];

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // Load Paystack inline script
    useEffect(() => {
        if (!(window as any).PaystackPop) {
            const script = document.createElement("script");
            script.src = "https://js.paystack.co/v1/inline.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    if (!plan) {
        return (
            <div className="py-24 px-6 text-center">
                <h2 className="text-2xl font-semibold text-[#36014b]">Plan not found</h2>
                <p className="mt-2 text-gray-600">Please choose a valid plan from the plans page.</p>
            </div>
        );
    }

    // Convert price string to number
    const cleanPrice = () => {
        const numeric = plan.price.replace(/[^\d.]/g, "");
        const amount = parseFloat(numeric);
        return isNaN(amount) ? 0 : amount;
    };

    const handlePayment = async () => {
        if (!email) {
            toast.error("Enter your email");
            return;
        }

        const amount = cleanPrice();
        if (amount <= 0) {
            toast.error("Invalid plan price");
            return;
        }

        try {
            setLoading(true);

            // Step 1: initiate subscription
            const res = await fetch(`${API_URL}/subscription/initiate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, planKey }),
            });
            const data = await res.json();
            const subscriptionId = data.subscriptionId;

            // Step 2: open Paystack
            const handler = (window as any).PaystackPop.setup({
                key: "pk_live_83d1f3b1b376e3bf9f932ea9b3c30cc199ce273b",
                email,
                amount: amount * 100,
                currency: "NGN",
                metadata: { plan: plan.title, email },
                callback: async (response: any) => {
                    try {
                        // Step 3: verify payment
                        const verifyRes = await fetch(`${API_URL}/subscription/verify`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ reference: response.reference, subscriptionId }),
                        });
                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            toast.success("Payment successful! Subscription is now active.");
                        } else {
                            toast.error("Payment completed but verification failed.");
                        }
                    } catch (err) {
                        toast.error("Error verifying payment");
                        console.error(err);
                    } finally {
                        setLoading(false);
                    }
                },
                onClose: () => {
                    toast.error("Payment cancelled");
                    setLoading(false);
                },
            });

            handler.openIframe();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
            setLoading(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto px-2 py-15">
            {/* <Toaster position="top-right" /> */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="bg-white rounded-3xl border-[#c804d7]/10 overflow-hidden"
            >
                {/* Header */}
                <div className="px-2 md:flex md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#36014b]">{plan.title}</h1>
                        <p className="mt-2 text-[#c804d7] font-semibold text-lg">{plan.price}</p>
                        <p className="text-sm text-gray-500 mt-1">{plan.calls}</p>
                    </div>

                    <div className="mt-6 md:mt-0 w-full md:w-1/3 flex flex-col gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c804d7]"
                        />
                        <button
                            disabled={loading}
                            onClick={handlePayment}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#36014b] to-[#c804d7] text-white font-semibold shadow-lg hover:shadow-2xl transition disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Proceed to Payment"}
                        </button>
                    </div>
                </div>

                {/* Content (Overview, Included, Perfect For) */}
                <div className="border-t border-gray-300 mt-3 px-4 py-4 grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-[#36014b]">Overview</h3>
                        <p className="text-gray-700 mt-3 leading-relaxed">{plan.overview}</p>

                        <h4 className="text-lg font-semibold text-[#36014b] mt-6">What's included</h4>
                        <ul className="mt-3 space-y-2 text-gray-800">
                            {plan.whatsIncluded.map((item, idx) => (
                                <li key={idx} className="flex gap-3 items-start">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-[#c804d7]" />
                                    <div>
                                        <p className="text-sm">{item}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {plan.perks.length > 0 && (
                            <>
                                <h4 className="text-lg font-semibold text-[#36014b] mt-6">Perks & Extras</h4>
                                <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                                    {plan.perks.map((p, i) => (
                                        <li key={i} className="text-sm">
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-[#36014b]">Perfect for</h3>
                        <p className="mt-3 text-gray-700">{plan.perfectFor}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Subscribe;
