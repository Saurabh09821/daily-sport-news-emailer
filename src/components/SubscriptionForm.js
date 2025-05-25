import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './Subscriber.css';

const sportsOptions = [  "Football",
  "Cricket",
  "Basketball",
  "Tennis",
  "Baseball",
  "Golf",
  "Table Tennis",
  "Volleyball",
  "Rugby",
  "Badminton",
  "Formula 1",
  "Ice Hockey",
  "Boxing",
  "Mixed Martial Arts",
  "Athletics",
  "Wrestling",
  "Swimming",
  "Cycling",
  "Snooker",
  "Esports",
  "Skiing",
  "Gymnastics",
  "Field Hockey",
  "American Football",
  "Softball",
  "Handball",
  "Karate",
  "Taekwondo",
  "Judo",
  "Surfing",
  "Skateboarding",
  "Motocross",
  "Horse Racing",
  "Archery",
  "Lacrosse",
  "Bowling",
  "Canoeing",
  "Diving",
  "Fencing",
  "Rowing",
  "Sailing",
  "Snowboarding",
  "Billiards",
  "Triathlon",
  "Climbing",
  "Netball",
  "Darts",
  "Racquetball",
  "Pickleball",
  "Sepak Takraw"];

function SubscriptionForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferences: []
  });

  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  
  // Scroll listener to fade out heading
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setFadeOut(true);
      else setFadeOut(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredSuggestions = sportsOptions.filter(
    (sport) =>
      sport.toLowerCase().includes(inputValue.toLowerCase()) &&
      !formData.preferences.includes(sport)
  );

  const handleAddPreference = (sport) => {
    if (!formData.preferences.includes(sport)) {
      setFormData((prev) => ({
        ...prev,
        preferences: [...prev.preferences, sport],
      }));
    }
    setInputValue('');
  };

  const handleRemovePreference = (sport) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.filter((s) => s !== sport),
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/subscribe", formData);
      setMessage("Subscribed successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Subscription failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-4">Subscribe to Daily Favourite Sports News</h2>
      
      <label className="block mb-2 font-medium">Name</label>
      <input
        type="text"
        name="name"
        required
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Email</label>
      <input
        type="email"
        name="email"
        required
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Favorite Sports</label>
      <div className="mb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.preferences.map((sport) => (
            <div
              key={sport}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center"
            >
              {sport}
              <button
                type="button"
                onClick={() => handleRemovePreference(sport)}
                className="ml-2 text-red-500 hover:text-red-700 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type to search sports..."
          className="w-full border px-3 py-2 rounded"
        />
        {inputValue && filteredSuggestions.length > 0 && (
          <ul className="border mt-1 rounded bg-white shadow max-h-40 overflow-y-auto">
            {filteredSuggestions.map((sport) => (
              <li
                key={sport}
                onClick={() => handleAddPreference(sport)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {sport}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Subscribe
      </button>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </form>
  );
}

export default SubscriptionForm;
