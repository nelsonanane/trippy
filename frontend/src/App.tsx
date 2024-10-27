import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import UserInputForm from "./components/UserInputForm";
import ResultsDisplay from "./components/ResultsDisplay";
import Footer from "./components/Footer";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // const [results, setResults] = useState();

  const results = {
    result: `# Comprehensive Travel Itinerary for Barcelona (May 23 - May 28, 2025) ## Overview - **Travelers**: 2 - **Total Budget**: $3200 ## Day 1: May 23, 2025 (Arrival) - **Flight Details**: - Departure: [Origin City] - Morning flight - Arrival: Barcelona El Prat Airport (BCN) - Early afternoon - **Justification**: Chosen for best balance of price and convenience, fits within budget constraints, allowing ample funds for the rest of the trip. - **Accommodation**: Hotel Jazz - **Location**: Near Plaça de Catalunya - **Cost**: $250 per night - **Rationale**: Centrally located with modern amenities, providing easy access to attractions. - **Activity**: La Rambla Stroll and Boqueria Market Visit - **Time**: Late Afternoon/Evening - **Description**: Enjoy a leisurely walk along La Rambla and explore the vibrant Boqueria Market. - **Cost**: Free to explore (food purchases extra) - **Dinner**: Suggested dining at a local tapas bar near La Rambla - **Estimated Cost**: $40 for two - **Daily Expenses**: - Accommodation: $250 - Meals: $40 - Miscellaneous: $20 - **Total**: $310 - **Remaining Budget**: $2890 ## Day 2: May 24, 2025 (Adventure and Relaxation) - **Activity**: Montserrat Hiking Tour - **Time**: Full Day - **Cost**: $160 for two - **Description**: Guided hiking tour to Montserrat Mountain and monastery. - **Dinner**: Return to Barcelona for dinner at a traditional Catalan restaurant - **Estimated Cost**: $50 for two - **Daily Expenses**: - Activity: $160 - Meals: $50 - Transportation: $40 (train and cable car) - Miscellaneous: $20 - **Total**: $270 - **Remaining Budget**: $2620 ## Day 3: May 25, 2025 (Cultural Exploration) - **Activity**: Sagrada Familia Tour - **Time**: Early Morning - **Cost**: $66 for two - **Description**: Explore the iconic basilica designed by Antoni Gaudí. - **Lunch**: Near Sagrada Familia - **Estimated Cost**: $30 for two - **Activity**: Gothic Quarter Walking Tour - **Time**: Afternoon - **Cost**: $30 for two - **Description**: Discover the historic heart of Barcelona. - **Dinner**: Enjoy dinner at a tapas restaurant in the Gothic Quarter - **Estimated Cost**: $50 for two - **Daily Expenses**: - Activities: $96 - Meals: $80 - Miscellaneous: $20 - **Total**: $196 - **Remaining Budget**: $2424 ## Day 4: May 26, 2025 (Relaxation and Nightlife) - **Activity**: Aire de Barcelona Spa - **Time**: Morning - **Cost**: $140 for two - **Description**: Luxurious spa experience with thermal baths and massages. - **Lunch**: Light lunch at a nearby cafe - **Estimated Cost**: $30 for two - **Free Time**: Afternoon for spontaneous exploration or relaxation - **Activity**: Tapas and Flamenco Evening - **Time**: Evening - **Cost**: $240 for two - **Description**: Tapas tasting followed by a live Flamenco show. - **Daily Expenses**: - Activities: $380 - Meals: $60 - Miscellaneous: $20 - **Total**: $460 - **Remaining Budget**: $1964 ## Day 5: May 27, 2025 (Leisure and Culture) - **Activity**: Park Güell - **Time**: Morning - **Cost**: $22 for two - **Description**: Visit Gaudí's colorful park with artistic structures and scenic views. - **Lunch**: Near Park Güell - **Estimated Cost**: $30 for two - **Activity**: Picasso Museum - **Time**: Afternoon - **Cost**: $28 for two - **Description**: Explore Pablo Picasso's extensive art collection. - **Dinner**: Casual dinner at a local eatery - **Estimated Cost**: $50 for two - **Daily Expenses**: - Activities: $50 - Meals: $80 - Miscellaneous: $20 - **Total**: $150 - **Remaining Budget**: $1814 ## Day 6: May 28, 2025 (Departure) - **Free Time**: Morning for last-minute shopping or sightseeing - **Lunch**: Quick meal before departure - **Estimated Cost**: $30 for two - **Transportation to Airport**: Taxi or public transport - **Estimated Cost**: $30 - **Flight Details**: - Departure: Barcelona El Prat Airport (BCN) - Afternoon flight - **Justification**: Chosen for convenience, allowing for a leisurely morning before departure. - **Daily Expenses**: - Meals: $30 - Transportation: $30 - **Total**: $60 - **Remaining Budget**: $1754 ## Tips for Travelers - **Local Customs**: Be mindful of local dining hours and tipping practices. - **Weather Preparedness**: May in Barcelona is warm; pack light clothing and sun protection. - **Special Considerations**: Book popular attractions in advance to avoid long lines. ## Summary This itinerary balances adventure, relaxation, and nightlife within the $3200 budget, providing a memorable travel experience in Barcelona. Trade-offs were made to prioritize key experiences while maintaining comfort and convenience. The remaining budget allows for flexibility and unexpected expenses.`,
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4">
          <UserInputForm
          // setResults={
          //   setResults as React.Dispatch<
          //     React.SetStateAction<object | undefined>
          //   >
          // }
          />
          {results && <ResultsDisplay results={results} />}
        </div>
      </main>
      <Footer />
      <div className="fixed bottom-4 right-4">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </div>
  );
}

export default App;
