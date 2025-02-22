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
    setStep(step + 1);
  };

  // Handle previous step
  const handlePrev = () => {
    setStep(step - 1);
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
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="New">New Customized Keyboard</option>
                <option value="Modification">Keyboard Modification</option>
              </select>
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
                      onChange={(e) => setKeyboardSize(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Size</option>
                      <option value="Full-size">Full-size</option>
                      <option value="TKL">Tenkeyless (TKL)</option>
                      <option value="75%">75%</option>
                      <option value="60%">60%</option>
                      <option value="45%">45%</option>
                    </select>
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
                        onClick={() => setNumSwitchLubing(numSwitchLubing + 1)}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setNumSwitchLubing(0)}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        No
                      </button>
                    </div>
                    {numSwitchLubing > 0 && (
                      <input
                        type="number"
                        value={numSwitchLubing}
                        onChange={(e) => setNumSwitchLubing(Number(e.target.value))}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
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
                        onClick={() => setKeyCapBrand("Akko")}
                        className={`p-2 border rounded-md ${keyCapBrand === "Akko" ? "border-blue-500" : "border-gray-300"}`}
                      >
                        <img src="/images/akko.png" alt="Akko" className="h-12 w-12" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setKeyCapBrand("Drop")}
                        className={`p-2 border rounded-md ${keyCapBrand === "Drop" ? "border-blue-500" : "border-gray-300"}`}
                      >
                        <img src="/images/drop.png" alt="Drop" className="h-12 w-12" />
                      </button>
                    </div>
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
                        onClick={() => setNumFilming(numFilming + 1)}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setNumFilming(0)}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        No
                      </button>
                    </div>
                    {numFilming > 0 && (
                      <input
                        type="number"
                        value={numFilming}
                        onChange={(e) => setNumFilming(Number(e.target.value))}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
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
                        onClick={() => setSwitchType("Outemu Red")}
                        className={`p-2 border rounded-md ${switchType === "Outemu Red" ? "border-blue-500" : "border-gray-300"}`}
                      >
                        <img src="/images/red-switch.png" alt="Outemu Red" className="h-12 w-12" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSwitchType("Outemu Blue")}
                        className={`p-2 border rounded-md ${switchType === "Outemu Blue" ? "border-blue-500" : "border-gray-300"}`}
                      >
                        <img src="/images/blue-switch.png" alt="Outemu Blue" className="h-12 w-12" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSwitchType("Outemu Brown")}
                        className={`p-2 border rounded-md ${switchType === "Outemu Brown" ? "border-blue-500" : "border-gray-300"}`}
                      >
                        <img src="/images/brown-switch.png" alt="Outemu Brown" className="h-12 w-12" />
                      </button>
                    </div>
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
                        onClick={() => setNumStabilizer(numStabilizer + 1)}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setNumStabilizer(0)}
                        className="p-2 border border-gray-300 rounded-md"
                      >
                        No
                      </button>
                    </div>
                    {numStabilizer > 0 && (
                      <input
                        type="number"
                        value={numStabilizer}
                        onChange={(e) => setNumStabilizer(Number(e.target.value))}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
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
                    onClick={() => setNumTapeLayer(numTapeLayer + 1)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setNumTapeLayer(0)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    No
                  </button>
                </div>
                {numTapeLayer > 0 && (
                  <input
                    type="number"
                    value={numTapeLayer}
                    onChange={(e) => setNumTapeLayer(Number(e.target.value))}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                )}
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
          <button onClick={() => alert("Order placed!")} className="mt-4 bg-green-500 text-white p-2 rounded-md ml-2">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Order;