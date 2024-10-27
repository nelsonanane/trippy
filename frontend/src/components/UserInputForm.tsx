import React, { useState } from "react";
import { Calendar, DollarSign, MapPin } from "lucide-react";
import axios from "axios";

const UserInputForm: React.FC<{ setResults: (results: object) => void }> = ({
  setResults,
}) => {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: 1000,
    travelers: 1,
    interests: [] as string[],
    accommodation: "",
    transportation: [] as string[],
    notes: "",
  });

  const interests = [
    "Adventure",
    "Culture",
    "Relaxation",
    "Food & Drink",
    "Nature",
    "Shopping",
    "Nightlife",
  ];

  const accommodations = ["Budget", "Mid-range", "Luxury"];
  const transportation = ["Flight", "Train", "Bus", "Rental car"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const [category, value] = name.split(".");

    setFormData((prevState) => ({
      ...prevState,
      [category as "interests" | "transportation"]: checked
        ? [...prevState[category as "interests" | "transportation"], value]
        : prevState[category as "interests" | "transportation"].filter(
            (item) => item !== value
          ),
    }));
  };

  const handleBudgetChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      budget: parseInt(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/kickoff",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setResults(response.data);
      // Handle the response here (e.g., display the itinerary)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  console.log({ formData });

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto my-8"
    >
      <div className="mb-4">
        <label htmlFor="destination" className="block mb-2 font-semibold">
          Destination
        </label>
        <div className="flex items-center">
          <MapPin className="text-gray-400 mr-2" />
          <input
            type="text"
            id="destination"
            name="destination"
            className="input flex-grow"
            placeholder="Where do you want to go?"
            value={formData.destination}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="startDate" className="block mb-2 font-semibold">
            Start Date
          </label>
          <div className="flex items-center">
            <Calendar className="text-gray-400 mr-2" />
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="input flex-grow"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="endDate" className="block mb-2 font-semibold">
            End Date
          </label>
          <div className="flex items-center">
            <Calendar className="text-gray-400 mr-2" />
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="input flex-grow"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="budget" className="block mb-2 font-semibold">
          Budget
        </label>
        <div className="flex items-center">
          <DollarSign className="text-gray-400 mr-2" />
          <input
            type="range"
            id="budget"
            min="100"
            max="10000"
            step="100"
            value={formData.budget}
            onChange={(e) => handleBudgetChange(e.target.value)}
            className="w-full"
          />
          <span className="ml-2 min-w-[80px] text-right">
            ${formData.budget}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="travelers" className="block mb-2 font-semibold">
          Number of Travelers
        </label>
        <input
          type="number"
          id="travelers"
          name="travelers"
          value={formData.travelers}
          onChange={handleInputChange}
          className="input w-full"
          min="1"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Interests</label>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <label
              key={interest}
              className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1"
            >
              <input
                type="checkbox"
                name={`interests.${interest}`}
                checked={formData.interests.includes(interest)}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span>{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Accommodation Preference
        </label>
        <div className="flex items-center space-x-4">
          {accommodations.map((acc) => (
            <label key={acc} className="flex items-center space-x-2">
              <input
                type="radio"
                name="accommodation"
                value={acc}
                checked={formData.accommodation === acc}
                onChange={handleInputChange}
                className="form-radio"
              />
              <span>{acc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Transportation Preferences
        </label>
        <div className="flex flex-wrap gap-2">
          {transportation.map((trans) => (
            <label
              key={trans}
              className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1"
            >
              <input
                type="checkbox"
                name={`transportation.${trans}`}
                checked={formData.transportation.includes(trans)}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span>{trans}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="notes" className="block mb-2 font-semibold">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="input w-full"
          placeholder="Any special requirements or preferences?"
          value={formData.notes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData((prevState) => ({
              ...prevState,
              [name]: value,
            }));
          }}
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Generate Itinerary
      </button>
    </form>
  );
};

export default UserInputForm;
