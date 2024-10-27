import React, { useState } from "react";
import { Map, Plane, Bed, Calendar, DollarSign } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Results {
  result: string;
}

const ResultsDisplay: React.FC<{ results: Results }> = ({ results }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Map },
    { id: "flights", label: "Flights", icon: Plane },
    { id: "accommodations", label: "Accommodations", icon: Bed },
    { id: "activities", label: "Activities", icon: Calendar },
    { id: "itinerary", label: "Daily Itinerary", icon: Calendar },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Your Travel Plan</h2>

      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mb-6">
        {activeTab === "overview" && (
          <div>
            <p className="mb-2">Your 7-day trip to Paris, France</p>
            <p className="mb-2">Total Estimated Cost: $3,500</p>
            <div className="flex space-x-4">
              <span className="flex items-center">
                <Plane size={18} className="mr-1" /> Air France
              </span>
              <span className="flex items-center">
                <Bed size={18} className="mr-1" /> Hotel de Ville
              </span>
              <span className="flex items-center">
                <Calendar size={18} className="mr-1" /> 10 Activities
              </span>
            </div>
          </div>
        )}
        {activeTab === "itinerary" && (
          <div>
            {typeof results?.result === "string" ? (
              <ReactMarkdown>{results.result}</ReactMarkdown>
            ) : (
              <div>No itinerary available</div>
            )}
          </div>
        )}
        {/* Add content for other tabs here */}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
        <div className="bg-gray-200 h-64 rounded-md flex items-center justify-center">
          Map Placeholder
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Cost Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Plane size={18} className="mr-2 text-primary" />
            <span>Flights: $1,200</span>
          </div>
          <div className="flex items-center">
            <Bed size={18} className="mr-2 text-primary" />
            <span>Accommodations: $1,500</span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="mr-2 text-primary" />
            <span>Activities: $600</span>
          </div>
          <div className="flex items-center">
            <DollarSign size={18} className="mr-2 text-primary" />
            <span>Miscellaneous: $200</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
