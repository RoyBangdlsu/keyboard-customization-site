import React, { useState } from "react";

function Order() {
  const [type, setType] = useState("New");
  const [keyboardSize, setKeyboardSize] = useState("");
  const [keyCapBrand, setKeyCapBrand] = useState("");
  const [numSwitchLubing, setNumSwitchLubing] = useState(0);
  const [numFilming, setNumFilming] = useState(0);
  const [numStabilizer, setNumStabilizer] = useState(0);
  const [numTapeLayer, setNumTapeLayer] = useState(0);
  const [switchType, setSwitchType] = useState("");
  const [caseFoam, setCaseFoam] = useState("");
  const [PEmod, setPEmod] = useState("");
  const [total, setTotal] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let calculatedTotal = 0;
    if (type === "New") {
      calculatedTotal = 100;
    } else if (type === "Modification") {
      calculatedTotal = 50;
      calculatedTotal += numSwitchLubing * 0.5;
      calculatedTotal += numFilming * 0.3;
      calculatedTotal += numStabilizer * 2;
      calculatedTotal += numTapeLayer * 0.1;
    }
    setTotal(calculatedTotal);
    setShowReview(true);
  };

  let redAudio = new Audio('./sounds/red.wav');
  let blueAudio = new Audio('./sounds/blue.wav');

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
              <option value="40%">40%</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Keycap Brand</label>
            <div className="flex space-x-4">
              <button type="button" onClick={() => setKeyCapBrand("Akko")} className={`p-2 border rounded-md ${keyCapBrand === "Akko" ? "border-blue-500" : "border-gray-300"}`}>
                <img src="/images/akko.png" alt="Akko" className="h-12 w-12" />
              </button>
              <button type="button" onClick={() => setKeyCapBrand("Drop")} className={`p-2 border rounded-md ${keyCapBrand === "Drop" ? "border-blue-500" : "border-gray-300"}`}>
                <img src="/images/drop.png" alt="Drop" className="h-12 w-12" />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Switch Type</label>
            <div className="flex space-x-4">
              <button type="button" onClick={() => setSwitchType("Red")} className={`p-2 border rounded-md ${switchType === "Red" ? "border-blue-500" : "border-gray-300"}`}>
                <img src="/images/red-switch.png" alt="Red Switch" className="h-12 w-12" />
              </button>
              <button type="button" onClick={() => setSwitchType("Blue")} className={`p-2 border rounded-md ${switchType === "Blue" ? "border-blue-500" : "border-gray-300"}`}>
                <img src="/images/blue-switch.png" alt="Blue Switch" className="h-12 w-12" />
              </button>
              <button type="button" onClick={() => blueAudio.play()} className="ml-2 bg-blue-500 text-white p-1 rounded">🔊</button>
              <button type="button" onClick={() => setSwitchType("Brown")} className={`p-2 border rounded-md ${switchType === "Brown" ? "border-blue-500" : "border-gray-300"}`}>
                <img src="/images/brown-switch.png" alt="Brown Switch" className="h-12 w-12" />
              </button>
            </div>
          </div>

          <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded-md">
            Review Order
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-lg font-bold">Order Review</h2>
          <p>Type of Service: {type === "New" ? "New Customized Keyboard" : "Keyboard Modification"}</p>
          <p>Keyboard Size: {keyboardSize}</p>
          <p>Keycap Brand: {keyCapBrand}</p>
          <p>Switch Type: {switchType}</p>
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
