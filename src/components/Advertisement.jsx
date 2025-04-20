import React from "react";

const Advertisement = () => {
  const ads = [
    { title: "Promoted Content", description: "Ad will be displayed here." },
    { title: "Advertisement", description: "Google AdSense Placeholder" },
    { title: "Sponsored", description: "Relevant ads will appear soon." },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col gap-4 px-3 py-5 w-[300px] h-screen fixed top-0 right-[15px] border-l border-gray-300 overflow-y-auto bg-white shadow-sm
      max-[1200px]:w-[200px]"
    >
      <h3 className="text-[22px] font-bold text-orange-600 uppercase tracking-wide text-center mb-3">
        Sponsored Ads
      </h3>

      {ads.map((ad, index) => (
        <div
          key={index}
          className="w-full h-[140px] bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center text-gray-800 font-semibold hover:scale-[1.05] cursor-pointer p-4"
        >
          <p className="text-lg mb-1 text-gray-900">{ad.title}</p>
          <small className="text-sm text-gray-500">{ad.description}</small>
        </div>
      ))}
    </aside>
  );
};

export default Advertisement;
