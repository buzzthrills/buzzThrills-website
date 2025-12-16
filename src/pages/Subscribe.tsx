// src/pages/Subscribe.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { apiRequest } from "../utils/apiRequest";

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
        overview: "Never forget the special moments...",
        whatsIncluded: ["Up to 12 heartfelt surprise calls per month", "Custom message scripting", "Access to all BuzzThrills call types", "Priority booking", "Flexible scheduling"],
        perks: ["Ad-ons available on request", "Best-value starter plan", "Simple management"],
        perfectFor: "Individuals who want consistent, low-effort thoughtfulness."
    },
    plus: {
        title: "Buzz Plus",
        price: "₦25,000 / month",
        calls: "Up to 20 Surprise Calls monthly",
        overview: "More calls, more love...",
        whatsIncluded: ["Up to 20 surprise calls per month", "Faster processing", "Customizable message templates", "Birthday music calls, light pranks", "Option to add special instructions"],
        perks: ["Higher delivery SLA", "Ideal for multi-recipient months", "Great balance of volume + premium features"],
        perfectFor: "Anyone who shows love through steady gestures."
    },
    orbit: {
        title: "Buzz Orbit",
        price: "₦50,000 / month",
        calls: "30+ Premium Surprise Calls monthly",
        overview: "The VIP tier...",
        whatsIncluded: ["30+ premium personalized calls", "Unlimited access to ALL premium calls", "Custom voice notes", "Preferred caller/host", "Bonus surprise calls every other month"],
        perks: ["VIP scheduling & priority support", "Custom voice & production elements", "Dedicated support contact"],
        perfectFor: "Families, creators, executives or small teams wanting high-touch experiences."
    },
    corporate: {
        title: "Buzz Corporate",
        price: "Custom — from ₦XX,XXX / month",
        calls: "35+ Corporate Calls (minimum)",
        overview: "A corporate-grade engagement solution...",
        whatsIncluded: ["At least 35 corporate-appropriate calls", "Branded messaging and tone", "Staff birthday & work anniversary reminders", "Client appreciation and follow-up calls", "Monthly performance reports"],
        perks: ["Dedicated account manager", "Custom integration options", "Reporting cadence"],
        perfectFor: "Businesses and HR teams wanting consistent, branded appreciation."
    },
};

const Subscribe: React.FC = () => {
    const [params] = useSearchParams();
    const planKey = params.get("plan") || "";
    const plan = PLANS[planKey as keyof typeof PLANS];

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");


    const navigate = useNavigate();

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

    const cleanPrice = () => {
        const numeric = plan.price.replace(/[^\d.]/g, "");
        const amount = parseFloat(numeric);
        return isNaN(amount) ? 0 : amount;
    };

    const loadPaystack = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if ((window as any).PaystackPop) return resolve();
            const script = document.createElement("script");
            script.src = "https://js.paystack.co/v1/inline.js";
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Paystack failed to load"));
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            setLoading(true);
            if (!email) {
                toast.error("Please enter your email");
                setLoading(false);
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error("Please enter a valid email address");
                setLoading(false);
                return;
            }


            if (planKey === "corporate") {
                toast("This is a custom-priced plan. Please contact us for corporate subscriptions.");
                setLoading(false);
                return;
            }

            const amount = cleanPrice();
            if (amount <= 0) {
                toast.error("Invalid plan price");
                setLoading(false);
                return;
            }

            await loadPaystack();

            if (!(window as any).PaystackPop) {
                toast.error("Paystack failed to load");
                setLoading(false);
                return;
            }

            // Step 1: initiate subscription
            const initRes = await apiRequest<{ subscriptionId: string }>("/user_subscription/initiate", {
                method: "POST",
                body: { email, planKey },
                token: localStorage.getItem("auth-token") || undefined,
            });

            if (!initRes.success || !initRes.data?.subscriptionId) {
                toast.error("Failed to start subscription");
                setLoading(false);
                return;
            }

            const subscriptionId = initRes.data.subscriptionId;

            // Step 2: Paystack
            const handler = (window as any).PaystackPop.setup({
                key: "pk_test_00ccb0a215a6bc99a9043b48c8c1c76f8ab37525",
                email: email,
                amount: amount * 100,
                currency: "NGN",
                metadata: { plan: plan.title, email },
                callback: function (response: any) {
                    // use .then instead of async/await
                    apiRequest("/user_subscription/verify", {
                        method: "POST",
                        body: { reference: response.reference, subscriptionId },
                        // token: localStorage.getItem("auth-token") || undefined
                    }).then((verifyRes) => {
                        if (verifyRes.success && verifyRes.data?.user) {
                            toast.success("Payment successful! Subscription is now active.");
                            localStorage.setItem("user", JSON.stringify(verifyRes.data.user));

                            navigate("/book");
                        } else {
                            toast.error("Payment completed but could not be verified.");
                        }
                        setLoading(false);
                    }).catch((err) => {
                        console.error(err);
                        toast.error("Verification failed");
                        setLoading(false);
                    });
                },
                onClose: function () {
                    toast.error("Payment cancelled");
                    setLoading(false);
                }
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
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="bg-white rounded-3xl border-[#c804d7]/10 overflow-hidden"
            >
                <div className="px-2 md:flex md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#36014b]">{plan.title}</h1>
                        <p className="mt-2 text-[#c804d7] font-semibold text-lg">{plan.price}</p>
                        <p className="text-sm text-gray-500 mt-1">{plan.calls}</p>
                    </div>

                    <div className="mt-6 md:mt-0 w-full md:w-1/3 flex flex-col gap-2">
                        <button
                            disabled={loading}
                            onClick={handlePayment}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#36014b] to-[#c804d7] text-white font-semibold shadow-lg hover:shadow-2xl transition disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Proceed to Payment"}
                        </button>
                    </div>
                </div>

                <div className="mt-4 mx-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-2 text-sm py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#c804d7] focus:outline-none"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        We’ll use this email for your receipt and account access.
                    </p>
                </div>


                <div className="border-t border-gray-300 mt-3 px-4 py-4 grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-semibold text-[#36014b]">Overview</h3>
                        <p className="text-gray-700 mt-3 leading-relaxed">{plan.overview}</p>

                        <h4 className="text-lg font-semibold text-[#36014b] mt-6">What's included</h4>
                        <ul className="mt-3 space-y-2 text-gray-800">
                            {plan.whatsIncluded.map((item, idx) => (
                                <li key={idx} className="flex gap-3 items-start">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-[#c804d7]" />
                                    <div><p className="text-sm">{item}</p></div>
                                </li>
                            ))}
                        </ul>

                        {plan.perks.length > 0 && (
                            <>
                                <h4 className="text-lg font-semibold text-[#36014b] mt-6">Perks & Extras</h4>
                                <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                                    {plan.perks.map((p, i) => (<li key={i} className="text-sm">{p}</li>))}
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
