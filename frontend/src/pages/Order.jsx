import React from "react";

function Order() {
    let type = "New";
    let numSwitchLubing = 0;
    let numFilming = 0;
    let numStabilizer = 0;
    let numTapeLayer = 0;
    let keyCapBrand = "";
    let switchType = "";
    let caseFoam = "";
    let PEmod = "";
    let total = 0;

    if(type == "New") {
      return (
        <div className="p-4">
          <h1 className="text-xl font-bold">Order Your Keyboard</h1>
          <p>Review your customized keyboard and place your order.</p>
          <p>Type of Service: New Customized Keyboard </p>
          <p>Keyboard Size: {keyCapBrand} </p>
          <p>Keycaps: {keyCapBrand} </p>
          <p>Key Switch: {switchType} </p>
        </div>
      );
    } else if (type == "Modification") {
      return (
        <div className="p-4">
          <h1 className="text-xl font-bold">Order Your Keyboard</h1>
          <p>Review your customized keyboard and place your order.</p>
          <p>Type of Service: Keyboard Modification</p>
          <p>Keycaps: {keyCapBrand} </p>
          <p>Key Switch: {switchType} </p>
          <p>Switch Lubing: {numSwitchLubing} Keys  </p>
          <p>Filming: {numFilming} Keys </p>
          <p>Stabilizer Tuning: {numStabilizer} Stablizers </p>
          <p>Case Foam: {caseFoam} </p>
          <p>PE Foam Mod: {PEmod} </p>
          <p>Tape Mod: {numTapeLayer} Layers </p>
          <p>Total: {total} </p>
          <button type="submit" className="mt-4 bg-green-500 text-white p-2">Cancel</button>
          <button type="submit" className="mt-4 bg-green-500 text-white p-2">Place Order</button>
        </div>
      );
    }
    
  }

export default Order; // ✅ Ensure this is present