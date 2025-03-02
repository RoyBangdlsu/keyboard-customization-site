import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Modify() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1); // Current step in the form
  const [keyboardSize, setKeyboardSize] = useState(""); // Keyboard size
  const [numSwitchLubing, setNumSwitchLubing] = useState(0); // Number of switches for lubing
  const [numFilming, setNumFilming] = useState(0); // Number of films
  const [numStabilizer, setNumStabilizer] = useState(0); // Number of stabilizers
  const [numTapeLayer, setNumTapeLayer] = useState(0); // Number of tape layers
  const [caseFoam, setCaseFoam] = useState(""); // Case Foam choice
  const [PEFoam, setPEFoam] = useState(""); // PE Foam choice
  const [total, setTotal] = useState(0); // Total cost
  const [showReview, setShowReview] = useState(false); // Show review section
  const [address, setAddress] = useState(""); // Address for delivery

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // State to store the current choice labels
  const [currentChoice, setCurrentChoice] = useState({
    keyboardSize: "",
    numSwitchLubing: 0,
    numFilming: 0,
    numStabilizer: 0,
    numTapeLayer: 0,
    caseFoam: "",
    PEFoam: "",
  });

  // Function to validate the current step
  const validateStep = () => {
    if (step === 1 && !keyboardSize) return false;
    return true;
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let calculatedTotal = 0;

    // Calculate total based on modifications
    calculatedTotal += numSwitchLubing * 8;
    calculatedTotal += numFilming * 6;
    calculatedTotal += numStabilizer * 50;
    calculatedTotal += numTapeLayer * 10;

    // Add costs for Case Foam and PE Foam
    if (caseFoam === "Yes") calculatedTotal += 20; // Example cost for Case Foam
    if (PEFoam === "Yes") calculatedTotal += 15; // Example cost for PE Foam

    setTotal(calculatedTotal);
    setShowReview(true);
  };

  const handlePlaceRequest = async (e) => {
    e.preventDefault();
    if (
      numSwitchLubing === 0 &&
      numFilming === 0 &&
      numStabilizer === 0 &&
      numTapeLayer === 0 &&
      caseFoam === "No" &&
      PEFoam === "No"
    ) {
      alert("Cannot Place Modification Request: Empty Request");
    } else {
      const resNew = await fetch("http://localhost:5000/api/modify/placerequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          address,
          keyboardSize,
          numSwitchLubing,
          numFilming,
          numStabilizer,
          numTapeLayer,
          caseFoam,
          PEFoam,
          total,
        }),
      });
      const dataNew = await resNew.json();
      if (resNew.status === 201) {
        alert("Order Placed!");
        navigate("/");
        window.location.reload();
      } else {
        alert(dataNew.message);
      }
    }
  };

  if (!user) {
    return <p className="text-center mt-10 text-xl">No user found. Please log in.</p>;
  }

  const customerName = user.name;
  const customerEmail = user.email;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Keyboard Modification</h1>
      {!showReview ? (
        <form onSubmit={handleSubmit}>
          {/* Step 1: Keyboard Size */}
          {step === 1 && (
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
                <option value="60%">60%</option>
              </select>
              <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.keyboardSize}</p>
            </div>
          )}

          {/* Step 2: Switch Lubing */}
          {step === 2 && (
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
          )}

          {/* Step 3: Filming */}
          {step === 3 && (
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
          )}

          {/* Step 4: Stabilizers */}
          {step === 4 && (
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
          )}

          {/* Step 5: Tape Mod */}
          {step === 5 && (
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
          )}

          {/* Step 6: Case Foam */}
          {step === 6 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Do you need Case Foam?</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setCaseFoam("Yes");
                    setCurrentChoice({ ...currentChoice, caseFoam: "Yes" });
                  }}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCaseFoam("No");
                    setCurrentChoice({ ...currentChoice, caseFoam: "No" });
                  }}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  No
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.caseFoam}</p>
            </div>
          )}

          {/* Step 7: PE Foam */}
          {step === 7 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Do you need PE Foam?</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setPEFoam("Yes");
                    setCurrentChoice({ ...currentChoice, PEFoam: "Yes" });
                  }}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPEFoam("No");
                    setCurrentChoice({ ...currentChoice, PEFoam: "No" });
                  }}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  No
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-600">Current Choice: {currentChoice.PEFoam}</p>
            </div>
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
            {step < 7 && (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Next
              </button>
            )}
            {step === 7 && (
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Review Request
              </button>
            )}
          </div>
        </form>
      ) : (
        <div>
          <form action="/orders" onSubmit={handlePlaceRequest}>
            <h2 className="text-lg font-bold">Request Review</h2>
            <p>Keyboard Size: {keyboardSize}</p>
            <p>Switch Lubing: {numSwitchLubing}</p>
            <p>Filming: {numFilming}</p>
            <p>Stabilizers: {numStabilizer}</p>
            <p>Tape Layers: {numTapeLayer}</p>
            <p>Case Foam: {caseFoam}</p>
            <p>PE Foam: {PEFoam}</p>
            <p>Total: ₱{total.toFixed(2)}</p>
            <div className="mt-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <button onClick={() => setShowReview(false)} className="mt-4 bg-green-500 text-white p-2 rounded-md">
              Edit Order
            </button>
            <button type="submit" className="mt-4 bg-green-500 text-white p-2 rounded-md ml-2">
              Place Modification Request
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Modify;
