import React, { useState } from "react";
import CallHistory from "../components/CallHistory";
import BookCallForm from "../components/BookCallForm";
import Tabs from "../components/Tabs";

const Dashboard: React.FC = () => {
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [activeTab , setActiveTab] = useState("Book Call");

  // Grab the subscription ID safely
  // const subscriptionId = user.subscription?._id || "";

  return (
    <div className="mt-8">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="">
        {activeTab === "Book Call" && (
          <BookCallForm   />
        )}
        {activeTab === "Call History" && <CallHistory />}

        {activeTab === "Recipients" && <div>Recipient Management</div>}
        {activeTab === "Settings" && <div>Account Settings</div>}
      </div>
    </div>
  );
};

export default Dashboard;
