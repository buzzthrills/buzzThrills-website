import React from "react";

type TabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const gradientColors = "from-[#c804d7] via-[#36014b] to-[#171053]";

  return (
    <div className="overflow-x-auto border-b border-gray-300 bg-white shadow-sm tabs-scrollbar">
      <div className="flex gap-2 px-2 py-4 min-w-max">
        {["Book Call", "Call History", "Recipients", "Settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-5 py-2 rounded-full font-medium whitespace-nowrap
              transition-all duration-300 transform
              ${
                activeTab === tab
                  ? `bg-gradient-to-r ${gradientColors} text-white shadow-lg scale-105`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
