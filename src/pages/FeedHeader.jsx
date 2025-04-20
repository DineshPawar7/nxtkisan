import React, { useState } from "react";

const FeedHeader = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { id: "trending", label: "🔥 Trending" },
    { id: "news", label: "📰 Kisan News" },
    { id: "debate", label: "🗣️ Debate" },
    { id: "posts", label: "📝 Posts" },
  ];

  return (
    <div className="max-w-[800px] mx-auto bg-white text-center text-[22px] font-bold border-b-2 border-gray-200 sticky top-0 z-[1000] p-4 sm:text-[18px]">
      <div className="flex justify-around flex-wrap gap-2 mt-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-3 py-2 text-[16px] font-bold transition-all duration-300 text-gray-800 hover:text-blue-600 ${
              activeTab === tab.id ? "border-b-2 border-blue-600 text-blue-600" : ""
            } sm:text-[14px] sm:px-2 sm:py-1`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedHeader;
