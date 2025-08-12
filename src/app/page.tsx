"use client";
import React, { useState } from "react";

export default function AreaConverter() {
  // Global (standard) factors in square-feet per unit (used as fallback)
  const globalFactors = {
    sqft: 1,
    sqm: 10.76391041671,
    sqyd: 9,
    acre: 43560,
    hectare: 107639.104167,
    cent: 435.6,
    guntha: 1089,
    gaj: 9,
    ankanam: 72,
    lecha: 144,
    kanal: 5445,
    marla: 272.25,
  };

  // State-specific overrides (sqft-per-unit)
  const stateOverrides = {
    "Uttar Pradesh": { bigha: 27225, katha: 1361.25 },
    Bihar: { bigha: 27211, katha: 1360.5 },
    "West Bengal": { bigha: 14400, katha: 720 },
    Assam: { bigha: 14400, katha: 2880, lecha: 144 },
    Punjab: { bigha: 9070, kanal: 5445, marla: 272.25 },
    Haryana: { bigha: 9070, kanal: 5445, marla: 272.25 },
    Rajasthan: {
      pucca_bigha: 27225,
      kachha_bigha: 17424,
      bigha: 27225,
      katha: 1361.25,
    },
    "Madhya Pradesh": { bigha: 12000, katha: 750 },
    "Himachal Pradesh": { bigha: 8712, katha: 1089, biswa: 436 },
    Uttarakhand: { bigha: 6804, katha: 1360.8 },
    Gujarat: { bigha: 17424, vigha: 17424 },
    Andhra_Pradesh: { ankanam: 72, bigha: 17424, katha: 3025 },
    Telangana: { ankanam: 72, bigha: 17424, katha: 3025 },
  };

  const states = [
    "Please Select State",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const units = [
    { name: "Square Feet", value: "sqft" },
    { name: "Square Meters", value: "sqm" },
    { name: "Square Yards", value: "sqyd" },
    { name: "Acres", value: "acre" },
    { name: "Hectares", value: "hectare" },
    { name: "Cents", value: "cent" },
    { name: "Guntha", value: "guntha" },
    { name: "Gaj (Gajam)", value: "gaj" },
    { name: "Ankanam", value: "ankanam" },
    { name: "Lecha", value: "lecha" },
    { name: "Kanal", value: "kanal" },
    { name: "Marla", value: "marla" },
    { name: "Bigha", value: "bigha" },
    { name: "Pucca Bigha", value: "pucca_bigha" },
    { name: "Kachha Bigha", value: "kachha_bigha" },
    { name: "Katha", value: "katha" },
    { name: "Biswa", value: "biswa" },
    { name: "Vigha", value: "vigha" },
  ];

  const [state, setState] = useState(states[0]);
  const [fromUnit, setFromUnit] = useState("sqft");
  const [toUnit, setToUnit] = useState("acre");
  const [inputValue, setInputValue] = useState(1);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const convertArea = () => {
    setError("");
    setResult("");

    const input = parseFloat(inputValue);
    if (Number.isNaN(input)) {
      setError("Please enter a valid number");
      return;
    }
    if (state === "Please Select State") {
      setError("Please select a state (some regional units depend on state)");
      return;
    }

    const fromFactor =
      stateOverrides[state] && stateOverrides[state][fromUnit] !== undefined
        ? stateOverrides[state][fromUnit]
        : globalFactors[fromUnit];

    const toFactor =
      stateOverrides[state] && stateOverrides[state][toUnit] !== undefined
        ? stateOverrides[state][toUnit]
        : globalFactors[toUnit];

    if (!fromFactor || !toFactor) {
      setError(
        "Conversion not available for selected units in this state yet."
      );
      return;
    }

    const sqftTotal = input * fromFactor;
    const converted = sqftTotal / toFactor;

    setResult(
      converted.toLocaleString(undefined, { maximumFractionDigits: 6 })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-3 flex items-center">
        <a
          href="https://www.gharpadharo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1"
        >
          <img
            src="/gharphlogo.png"
            alt="Gharpadharo Logo"
            className="h-12 w-auto"
          />
          <span className="text-lg font-semibold text-black-700">
            GharPadharo
          </span>
        </a>
      </nav>

      {/* Main Content - Responsive */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-20 p-4 lg:pl-20 mt-8">
        {/* Converter Box */}
        <div className="bg-[url('/bg.jpeg')] bg-cover bg-center rounded-xl shadow-lg p-6 w-full sm:w-96">
          <h1 className="text-2xl font-bold text-[#4B3F72] mb-4 text-center">
            Area Converter
          </h1>

          {/* State selection */}
          <div className="mb-3">
            <label className="block text-gray-600 mb-1">Select State</label>
            <select
              className="w-full border p-2 rounded-md"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setResult("");
                setError("");
              }}
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Value input */}
          <div className="mb-3">
            <label className="block text-gray-600 mb-1">Enter value</label>
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          {/* Units selection */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-gray-600 mb-1">From</label>
              <select
                className="w-full border p-2 rounded-md"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {units.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center w-12 h-12 bg-purple-200 rounded-full text-blue-700 text-xl mt-5">
              ↔
            </div>

            <div className="flex-1">
              <label className="block text-gray-600 mb-1">To</label>
              <select
                className="w-full border p-2 rounded-md"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {units.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Convert button */}
          <button
            onClick={convertArea}
            className="w-full bg-[#4B3F72] text-white py-2 rounded-md mb-3"
          >
            Convert
          </button>

          {/* Error */}
          {error && <div className="text-red-600 mb-3">{error}</div>}

          {/* Result */}
          {result !== "" && !error && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-center">
              <span className="font-bold text-lg">
                {inputValue} {fromUnit} = {result} {toUnit}
              </span>
            </div>
          )}
        </div>

        {/* Responsive Image */}
        <div className="flex justify-center items-center">
          <img
            src="/fac2.png"
            alt="Woman Holding Phone"
            className="max-h-[520px] w-auto object-contain -mt-30"
          />
        </div>
      </div>
    </div>
  );
}