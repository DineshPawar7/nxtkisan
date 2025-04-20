import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import { IoIosPricetags } from "react-icons/io";
import { CgSearchLoading } from "react-icons/cg";
import { CiWarning } from "react-icons/ci";

const MandiBhav = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedState, setSelectedState] = useState("");
  const [selectedVariety, setSelectedVariety] = useState("");
  const [selectedMarket, setSelectedMarket] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const response = await axios.get(
          "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24",
          {
            params: {
              "api-key": "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b",
              format: "json",
              limit: 100,
              "filters[Arrival_Date]": today,
            },
          }
        );

        const sortedData = response.data.records.sort(
          (a, b) => new Date(b.Arrival_Date) - new Date(a.Arrival_Date)
        );

        setData(sortedData);
        setFilteredData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (selectedState) {
      filtered = filtered.filter((item) => item.State === selectedState);
    }
    if (selectedVariety) {
      filtered = filtered.filter((item) => item.Variety === selectedVariety);
    }
    if (selectedMarket) {
      filtered = filtered.filter((item) => item.Market === selectedMarket);
    }
    setFilteredData(filtered);
    updateChart(filtered);
  }, [selectedState, selectedVariety, selectedMarket]);

  const updateChart = (filtered) => {
    if (filtered.length === 0) return;
    const ctx = document.getElementById("priceChart").getContext("2d");

    if (window.myChart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: filtered.map((item) => item.Commodity),
        datasets: [
          {
            label: "Min Price",
            data: filtered.map((item) => item.Min_Price),
            backgroundColor: "green",
          },
          {
            label: "Max Price",
            data: filtered.map((item) => item.Max_Price),
            backgroundColor: "red",
          },
          {
            label: "Avg. Price",
            data: filtered.map((item) => item.Modal_Price),
            backgroundColor: "blue",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  return (
    <div className="flex justify-center items-start p-4">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-teal-700 flex items-center justify-center gap-2 mb-6">
          <IoIosPricetags className="text-3xl" /> Mandi Bhav (Today's)
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <select
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select State</option>
            {[...new Set(data.map((item) => item.State))].map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedVariety(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Choose a Variety</option>
            {[...new Set(data.map((item) => item.Variety))].map((variety) => (
              <option key={variety} value={variety}>
                {variety}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Market</option>
            {[...new Set(data.map((item) => item.Market))].map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-600 text-md flex justify-center items-center gap-2">
            <CgSearchLoading className="text-xl animate-spin" />
            Loading...
          </p>
        ) : (
          <>
            {/* Chart */}
            <div className="w-full h-[400px] mb-6">
              <canvas id="priceChart"></canvas>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center border border-gray-200">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="p-2">State</th>
                    <th className="p-2">Dist.</th>
                    <th className="p-2">Commodity</th>
                    <th className="p-2">Variety</th>
                    <th className="p-2">Min Price</th>
                    <th className="p-2">Max Price</th>
                    <th className="p-2">Avg. Price</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 transition-all duration-200"
                      >
                        <td className="border p-2">{item.State}</td>
                        <td className="border p-2">{item.District}</td>
                        <td className="border p-2">{item.Commodity}</td>
                        <td className="border p-2">{item.Variety}</td>
                        <td className="border p-2 text-green-600 font-semibold">{item.Min_Price}</td>
                        <td className="border p-2 text-red-600 font-semibold">{item.Max_Price}</td>
                        <td className="border p-2 text-blue-600 font-semibold">{item.Modal_Price}</td>
                        <td className="border p-2">{item.Arrival_Date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-6 text-red-600 font-semibold text-md flex justify-center items-center gap-2">
                        <CiWarning className="text-xl" />
                        No fresh data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MandiBhav;
