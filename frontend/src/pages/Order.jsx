import React, { useState } from "react";

function Order() {
  const [step, setStep] = useState(1); // Current step in the form
  const [type, setType] = useState("New"); // Type of service
  const [keyboardSize, setKeyboardSize] = useState(""); // Keyboard size
  const [keyCapBrand, setKeyCapBrand] = useState(""); // Keycap brand
  const [switchType, setSwitchType] = useState(""); // Switch type
  const [numSwitchLubing, setNumSwitchLubing] = useState(0); // Number of switches for lubing
  const [numFilming, setNumFilming] = useState(0); // Number of films
  const [numStabilizer, setNumStabilizer] = useState(0); // Number of stabilizers
  const [numTapeLayer, setNumTapeLayer] = useState(0); // Number of tape layers
  const [total, setTotal] = useState(0); // Total cost
  const [showReview, setShowReview] = useState(false); // Show review section

  // State to store the current choice labels
  const [currentChoice, setCurrentChoice] = useState({
    type: "New Customized Keyboard",
    keyboardSize: "",
    keyCapBrand: "",
    switchType: "Outemu Blue",
    numSwitchLubing: 0,
    numFilming: 0,
    numStabilizer: 0,
    numTapeLayer: 0,
  });

  // Audio objects
  const blueAudio = new Audio('./sounds/blue.wav');
  const redAudio = new Audio('./sounds/red.wav');
  const brownAudio = new Audio('./sounds/brown.wav');

  // Function to play sound and pause others
  const playSound = (audio) => {
    // Pause all sounds
    blueAudio.pause();
    redAudio.pause();
    brownAudio.pause();

    // Play the selected sound
    audio.currentTime = 0; // Reset audio to start
    audio.play();
  };

  const validateStep = () => {
    if (step === 1 && !type) return false;
    if (step === 2 && type === "New" && !keyboardSize) return false;
    if (step === 2 && type === "Modification" && numSwitchLubing === 0) return false;
    if (step === 3 && type === "New" && !keyCapBrand) return false;
    if (step === 3 && type === "Modification" && numFilming === 0) return false;
    if (step === 4 && type === "New" && !switchType) return false;
    if (step === 4 && type === "Modification" && numStabilizer === 0) return false;
    if (step === 5 && type === "Modification" && numTapeLayer === 0) return false;
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let calculatedTotal = 0;

    if (type === "New") {
      calculatedTotal = 100; // Base price for a new keyboard
    } else if (type === "Modification") {
      calculatedTotal += numSwitchLubing * 0.5;
      calculatedTotal += numFilming * 0.3;
      calculatedTotal += numStabilizer * 2;
      calculatedTotal += numTapeLayer * 0.1;
    }

    setTotal(calculatedTotal);
    setShowReview(true);
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      alert("Please make a choice before proceeding.");
    }
  };

  // Handle previous step
  const handlePrev = () => {
    setStep(step - 1);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/orders/placeorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, keyboardSize, keyCapBrand, switchType, total }),
    });
    const data = await res.json();
    if (res.status === 201) {
      alert("Order Placed.");
      //navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Order Your Keyboard</h1>
      {!showReview ? (
        <form onSubmit={handleSubmit}>
          {/* Step 1: Type of Service */}
          {step === 1 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Type of Service</label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setCurrentChoice({ ...currentChoice, type: e.target.value === "New" ? "New Customized Keyboard" : "Keyboard Modification" });
                }}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="New">New Customized Keyboard</option>
                <option value="Modification">Keyboard Modification</option>
              </select>
              <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.type}</p>
            </div>
          )}

          {/* Step 2: Conditional Questions */}
          {step === 2 && (
            <>
              {type === "New" ? (
                <>
                  {/* Question 2: Keyboard Size */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Keyboard Size</label>
                    <select
                      value={keyboardSize}
                      onChange={(e) => {
                        setKeyboardSize(e.target.value);
                        setCurrentChoice({ ...currentChoice, keyboardSize: e.target.value });
                      }}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Size</option>
                      <option value="Full-size">Full-size</option>
                      <option value="TKL">Tenkeyless (TKL)</option>
                      <option value="75%">75%</option>
                      <option value="60%">60%</option>
                      <option value="45%">45%</option>
                    </select>
                    <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.keyboardSize}</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Question 2: Switch Lubing */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Do you need Switch Lubing?</label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setNumSwitchLubing(numSwitchLubing + 1);
                          setCurrentChoice({ ...currentChoice, numSwitchLubing: numSwitchLubing + 1 });
                        }}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNumSwitchLubing(0);
                          setCurrentChoice({ ...currentChoice, numSwitchLubing: 0 });
                        }}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        No
                      </button>
                    </div>
                    {numSwitchLubing > 0 && (
                      <input
                        type="number"
                        value={numSwitchLubing}
                        onChange={(e) => {
                          setNumSwitchLubing(Number(e.target.value));
                          setCurrentChoice({ ...currentChoice, numSwitchLubing: Number(e.target.value) });
                        }}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                    <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.numSwitchLubing > 0 ? `Yes (${currentChoice.numSwitchLubing})` : "No"}</p>
                  </div>
                </>
              )}
            </>
          )}

          {/* Step 3: Conditional Questions */}
          {step === 3 && (
            <>
              {type === "New" ? (
                <>
                  {/* Question 3: Keycap Brand */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Keycap Brand</label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setKeyCapBrand("Akko");
                          setCurrentChoice({ ...currentChoice, keyCapBrand: "Akko" });
                        }}
                        className={`p-2 border rounded-md ${keyCapBrand === "Akko" ? "border-blue-500" : "border-gray-300"}`}
                      >
                        <img src="/images/akko.png" alt="Akko" className="h-12 w-12" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setKeyCapBrand("Drop");
                          setCurrentChoice({ ...currentChoice, keyCapBrand: "Drop" });
                        }}
                        className={`p-2 border rounded-md ${keyCapBrand === "Drop" ? "border-blue-500" : "border-gray-300"}`}
                      >
                        <img src="/images/drop.png" alt="Drop" className="h-12 w-12" />
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.keyCapBrand}</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Question 3: Filming */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Do you need Filming?</label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setNumFilming(numFilming + 1);
                          setCurrentChoice({ ...currentChoice, numFilming: numFilming + 1 });
                        }}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNumFilming(0);
                          setCurrentChoice({ ...currentChoice, numFilming: 0 });
                        }}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        No
                      </button>
                    </div>
                    {numFilming > 0 && (
                      <input
                        type="number"
                        value={numFilming}
                        onChange={(e) => {
                          setNumFilming(Number(e.target.value));
                          setCurrentChoice({ ...currentChoice, numFilming: Number(e.target.value) });
                        }}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                    <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.numFilming > 0 ? `Yes (${currentChoice.numFilming})` : "No"}</p>
                  </div>
                </>
              )}
            </>
          )}

          {/* Step 4: Conditional Questions */}
          {step === 4 && (
            <>
              {type === "New" ? (
                <>
                  {/* Question 4: Switch Type */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Switch Type</label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSwitchType("Outemu Red");
                          setCurrentChoice({ ...currentChoice, switchType: "Outemu Red" });
                        }}
                        className={`p-2 border rounded-md ${switchType === "Outemu Red" ? "border-blue-500" : "border-gray-300"}`}
                      >
                        <img src="/images/red-switch.png" alt="Outemu Red" className="h-12 w-12" />
                      </button>
                      <button
                        type="button"
                        onClick={() => playSound(redAudio)}
                        className="ml-2 bg-blue-500 text-white p-1 rounded"
                      >
                        🔊
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSwitchType("Outemu Blue");
                          setCurrentChoice({ ...currentChoice, switchType: "Outemu Blue" });
                        }}
                        className={`p-2 border rounded-md ${switchType === "Outemu Blue" ? "border-blue-500" : "border-gray-300"}`}
                      >
                        <img src="/images/blue-switch.png" alt="Outemu Blue" className="h-12 w-12" />
                      </button>
                      <button
                        type="button"
                        onClick={() => playSound(blueAudio)}
                        className="ml-2 bg-blue-500 text-white p-1 rounded"
                      >
                        🔊
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSwitchType("Outemu Brown");
                          setCurrentChoice({ ...currentChoice, switchType: "Outemu Brown" });
                        }}
                        className={`p-2 border rounded-md ${switchType === "Outemu Brown" ? "border-blue-500" : "border-gray-300"}`}
                      >
                        <img src="/images/brown-switch.png" alt="Outemu Brown" className="h-12 w-12" />
                      </button>
                      <button
                        type="button"
                        onClick={() => playSound(brownAudio)}
                        className="ml-2 bg-blue-500 text-white p-1 rounded"
                      >
                        🔊
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.switchType}</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Question 4: Stabilizers */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Do you need Stabilizers?</label>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setNumStabilizer(numStabilizer + 1);
                          setCurrentChoice({ ...currentChoice, numStabilizer: numStabilizer + 1 });
                        }}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNumStabilizer(0);
                          setCurrentChoice({ ...currentChoice, numStabilizer: 0 });
                        }}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        No
                      </button>
                    </div>
                    {numStabilizer > 0 && (
                      <input
                        type="number"
                        value={numStabilizer}
                        onChange={(e) => {
                          setNumStabilizer(Number(e.target.value));
                          setCurrentChoice({ ...currentChoice, numStabilizer: Number(e.target.value) });
                        }}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                    <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.numStabilizer > 0 ? `Yes (${currentChoice.numStabilizer})` : "No"}</p>
                  </div>
                </>
              )}
            </>
          )}

          {/* Step 5: Conditional Questions (Only for Modification) */}
          {step === 5 && type === "Modification" && (
            <>
              {/* Question 5: Tape Mod */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Do you need Tape Mod?</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setNumTapeLayer(numTapeLayer + 1);
                      setCurrentChoice({ ...currentChoice, numTapeLayer: numTapeLayer + 1 });
                    }}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNumTapeLayer(0);
                      setCurrentChoice({ ...currentChoice, numTapeLayer: 0 });
                    }}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    No
                  </button>
                </div>
                {numTapeLayer > 0 && (
                  <input
                    type="number"
                    value={numTapeLayer}
                    onChange={(e) => {
                      setNumTapeLayer(Number(e.target.value));
                      setCurrentChoice({ ...currentChoice, numTapeLayer: Number(e.target.value) });
                    }}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
                <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.numTapeLayer > 0 ? `Yes (${currentChoice.numTapeLayer})` : "No"}</p>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Previous
              </button>
            )}
            {step < (type === "New" ? 4 : 5) && (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Next
              </button>
            )}
            {step === (type === "New" ? 4 : 5) && (
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Review Order
              </button>
            )}
          </div>
        </form>
      ) : (
        <div>
          <form action="/orders" onSubmit={handlePlaceOrder}>
          <h2 className="text-lg font-bold">Order Review</h2>
          {type === "New" ? (
            <>
              <p>Type of Service: New Customized Keyboard</p>
              <p>Keyboard Size: {keyboardSize}</p>
              <p>Keycap Brand: {keyCapBrand}</p>
              <p>Switch Type: {switchType}</p>
            </>
          ) : (
            <>
              <p>Type of Service: Keyboard Modification</p>
              <p>Switch Lubing: {numSwitchLubing}</p>
              <p>Filming: {numFilming}</p>
              <p>Stabilizers: {numStabilizer}</p>
              <p>Tape Layers: {numTapeLayer}</p>
            </>
          )}
          <p>Total: ₱{total.toFixed(2)}</p>
          <button onClick={() => setShowReview(false)} className="mt-4 bg-green-500 text-white p-2 rounded-md">
            Edit Order
          </button>
          <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded-md ml-2">
            Place Order
          </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Order;