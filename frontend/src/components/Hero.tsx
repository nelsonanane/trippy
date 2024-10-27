import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-secondary text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Plan Your Dream Trip with AI</h1>
        <p className="text-xl mb-8">Tell us your preferences, and our AI agents will create the perfect itinerary</p>
        <button className="btn btn-primary">Start Planning</button>
      </div>
    </section>
  );
};

export default Hero;