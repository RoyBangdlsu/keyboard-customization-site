import React, { useState } from "react";

function Order() {
  const [type, setType] = useState("New");
  const [numSwitchLubing, setNumSwitchLubing] = useState(0);
  const [numFilming, setNumFilming] = useState(0);
  const [numStabilizer, setNumStabilizer] = useState(0);
  const [numTapeLayer, setNumTapeLayer] = useState(0);
  const [keyCapBrand, setKeyCapBrand] = useState("");
  const [switchType, setSwitchType] = useState("");
  const [caseFoam, setCaseFoam] = useState("");
  const [PEmod, setPEmod] = useState("");
  const [total, setTotal] = useState(0);
  const [showReview, setShowReview] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate total based on user choices
    let calculatedTotal = 0;
    if (type === "New") {
      calculatedTotal = 100; // Base price for new keyboard
    } else if (type === "Modification") {
      calculatedTotal = 50; // Base price for modification
      calculatedTotal += numSwitchLubing * 0.5;
      calculatedTotal += numFilming * 0.3;
      calculatedTotal += numStabilizer * 2;
      calculatedTotal += numTapeLayer * 0.1;
    }
    setTotal(calculatedTotal);
    setShowReview(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Order Your Keyboard</h1>
      {!showReview ? (
        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Keycap Brand</label>
            <input
              type="text"
              value={keyCapBrand}
              onChange={(e) => setKeyCapBrand(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Switch Type</label>
            <input
              type="text"
              value={switchType}
              onChange={(e) => setSwitchType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {type === "Modification" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Number of Keys to Lube</label>
                <input
                  type="number"
                  value={numSwitchLubing}
                  onChange={(e) => setNumSwitchLubing(parseInt(e.target.value))}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Number of Keys to Film</label>
                <input
                  type="number"
                  value={numFilming}
                  onChange={(e) => setNumFilming(parseInt(e.target.value))}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Number of Stabilizers to Tune</label>
                <input
                  type="number"
                  value={numStabilizer}
                  onChange={(e) => setNumStabilizer(parseInt(e.target.value))}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Case Foam</label>
                <input
                  type="text"
                  value={caseFoam}
                  onChange={(e) => setCaseFoam(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">PE Foam Mod</label>
                <input
                  type="text"
                  value={PEmod}
                  onChange={(e) => setPEmod(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Number of Tape Layers</label>
                <input
                  type="number"
                  value={numTapeLayer}
                  onChange={(e) => setNumTapeLayer(parseInt(e.target.value))}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded-md">
            Review Order
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-lg font-bold">Order Review</h2>
          <p>Type of Service: {type === "New" ? "New Customized Keyboard" : "Keyboard Modification"}</p>
          <p>Keycap Brand: {keyCapBrand}</p>
          <p>Switch Type: {switchType}</p>
          {type === "Modification" && (
            <>
              <p>Switch Lubing: {numSwitchLubing} Keys</p>
              <p>Filming: {numFilming} Keys</p>
              <p>Stabilizer Tuning: {numStabilizer} Stabilizers</p>
              <p>Case Foam: {caseFoam}</p>
              <p>PE Foam Mod: {PEmod}</p>
              <p>Tape Mod: {numTapeLayer} Layers</p>
            </>
          )}
          <p>Total: ${total.toFixed(2)}</p>
          <button
            onClick={() => setShowReview(false)}
            className="mt-4 bg-green-500 text-white p-2 rounded-md"
          >
            Edit Order
          </button>
          <button
            onClick={() => alert("Order placed!")}
            className="mt-4 bg-green-500 text-white p-2 rounded-md ml-2"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Order;