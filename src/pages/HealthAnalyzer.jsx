import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function HealthAnalyzer() {
  const [inputValue, setInputValue] = useState("");
  const [huggingFaceResponse, setHuggingFaceResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to send API request
  async function query(data) {
    setLoading(true);
    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/Zabihin/Symptom_to_Diagnosis",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      // Process response: Ensure it's an array and sort by score
      if (Array.isArray(result) && result.length > 0) {
        const sortedResults = result[0].sort((a, b) => b.score - a.score);
        setHuggingFaceResponse(sortedResults); // Store sorted results
      } else {
        setHuggingFaceResponse([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHuggingFaceResponse([]);
    } finally {
      setLoading(false);
    }
  }

  // Handle button click
  const handleRequest = () => {
    if (inputValue.trim() === "") {
      toast("Enter symptoms before analyzing.", { icon: "🚨", style: { color: "red" } });
      return;
    }
    query({ inputs: inputValue });
  };

  // Handle input changes
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // **Clear predictions when input is empty**
  useEffect(() => {
    if (inputValue.trim() === "") {
      setHuggingFaceResponse(null);
    }
  }, [inputValue]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 overflow-hidden">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Health Analyzer</h1>

        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter your symptoms"
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleRequest}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full mt-4"
        >
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </button>

        {/* Display API Response */}
        {huggingFaceResponse && (
          <div className="mt-4 p-4 bg-gray-50 border rounded-md max-h-[50vh] overflow-auto">
            <h2 className="font-semibold">Predicted Diagnosis:</h2>

            {huggingFaceResponse.length === 0 ? (
              <p className="text-gray-500">No diagnosis found. Try again with different symptoms.</p>
            ) : (
              <ul className="mt-2">
                {huggingFaceResponse.slice(0, 5).map((item, index) => (
                  <li key={index} className="text-gray-700 flex justify-between">
                    <span>{item.label}</span>
                    <span className="font-bold text-blue-600">
                      {(item.score * 100).toFixed(2)}%
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthAnalyzer;
