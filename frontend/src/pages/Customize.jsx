import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import domtoimage from 'dom-to-image';
import './customize.css';

// Define the AddOnsModal component
const AddOnsModal = ({ selectedKey, keyAddOns, setKeyAddOns, onClose }) => {
  const currentAddOns = keyAddOns[selectedKey] || { stabilizers: false, lubing: false, filming: false };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setKeyAddOns((prevAddOns) => ({
      ...prevAddOns,
      [selectedKey]: {
        ...currentAddOns,
        [name]: checked,
      },
    }));
  };

  return (
    <div className="add-ons-modal">
      <h3>
        Add-ons for <span className="key-emphasis">{selectedKey}</span>
      </h3>
      <div className="add-ons-container">
        <div className="row">
          <div className="column1">Stabilizers:</div>
          <div className="column2"></div>
          <div className="column3">
            <input
              type="checkbox"
              name="stabilizers"
              checked={currentAddOns.stabilizers}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="column1">Lubing:</div>
          <div className="column2"></div>
          <div className="column3">
            <input
              type="checkbox"
              name="lubing"
              checked={currentAddOns.lubing}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="column1">Filming:</div>
          <div className="column2"></div>
          <div className="column3">
            <input
              type="checkbox"
              name="filming"
              checked={currentAddOns.filming}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
      </div>
      <button className="close-btn" onClick={onClose}>Close</button>
    </div>
  );
};


// Main Customize component
function Customize() {
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  const baseState = {
    layout: 'full',
    bodyColor: '#000000',
    switchType: 'N/A',
    keycapColors: {},
    keycapBrand: 'Akko', // Default keycap brand
  };

  const loggedInUser = localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user.email;

  // Load saved state for the logged-in user
  const getUserStorageKey = (key) => `user_${loggedInUser}_${key}`;

  const [layout, setLayout] = useState(
    localStorage.getItem(getUserStorageKey('keyboardLayout')) || baseState.layout
  );
  const [bodyColor, setBodyColor] = useState(
    localStorage.getItem(getUserStorageKey('keyboardBodyColor')) || baseState.bodyColor
  );
  const [switchType, setSwitchType] = useState(
    localStorage.getItem(getUserStorageKey('keyboardSwitchType')) || baseState.switchType
  );
  const [keycapColors, setKeycapColors] = useState(
    JSON.parse(localStorage.getItem(getUserStorageKey('keyboardKeycapColors'))) || baseState.keycapColors
  );
  const [keycapBrand, setKeycapBrand] = useState(
    localStorage.getItem(getUserStorageKey('keyboardKeycapBrand')) || baseState.keycapBrand
  );
  const [selectedKey, setSelectedKey] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [keyAddOns, setKeyAddOns] = useState(
    JSON.parse(localStorage.getItem(getUserStorageKey('keyAddOns'))) || {}
  )
  const [showAddOnsModal, setShowAddOnsModal] = useState(false);

  // Add-ons state
  const [numSwitchLubing, setNumSwitchLubing] = useState(0);
  const [numFilming, setNumFilming] = useState(0);
  const [numStabilizer, setNumStabilizer] = useState(0);
  const [caseFoam, setCaseFoam] = useState(
    localStorage.getItem(getUserStorageKey('caseFoam')) || "No"
  );
  const [PEFoam, setPEFoam] = useState(
    localStorage.getItem(getUserStorageKey('PEFoam')) || "No"
  );
  const [numTapeLayer, setNumTapeLayer] = useState(
    Number(localStorage.getItem(getUserStorageKey('numTapeLayer'))) || 0
  );
  const [total, setTotal] = useState(0);
  const [showDesigns, setShowDesigns] = useState(false);

  useEffect(() => {
    if (location.state?.design) {
      const { design } = location.state;
      setLayout(design.layout);
      setBodyColor(design.bodyColor);
      setKeycapColors(JSON.parse(design.keycapsColor));
      setSwitchType(design.switchType);
      setKeycapBrand(design.keycapBrand);
    }
  }, [location.state]);

  // Audio references for switch sounds
  let brownSound = new Audio('./sounds/brown.wav'); // Path to brown switch sound
  let blueSound = new Audio('./sounds/blue.wav'); // Path to blue switch sound
  let redSound = new Audio('./sounds/red.wav'); // Path to red switch sound

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem(getUserStorageKey('keyboardLayout'), layout);
      localStorage.setItem(getUserStorageKey('keyboardBodyColor'), bodyColor);
      localStorage.setItem(getUserStorageKey('keyboardSwitchType'), switchType);
      localStorage.setItem(getUserStorageKey('keyboardKeycapColors'), JSON.stringify(keycapColors));
      localStorage.setItem(getUserStorageKey('keyboardKeycapBrand'), keycapBrand);
      localStorage.setItem(getUserStorageKey('keyAddOns'), JSON.stringify(keyAddOns));
      localStorage.setItem(getUserStorageKey('caseFoam'), caseFoam); // Save caseFoam
      localStorage.setItem(getUserStorageKey('PEFoam'), PEFoam); // Save PEFoam
      localStorage.setItem(getUserStorageKey('numTapeLayer'), numTapeLayer); // Save numTapeLayer
    }
  }, [layout, bodyColor, switchType, keycapColors, keycapBrand, keyAddOns, caseFoam, PEFoam, numTapeLayer, loggedInUser]);

  if (!loggedInUser) {
    return <div>Please log in to customize your keyboard.</div>;
  }

  // Reset design to base state
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset this design?')) {
      setLayout(baseState.layout);
      setBodyColor(baseState.bodyColor);
      setSwitchType(baseState.switchType);
      setKeycapColors(baseState.keycapColors);
      setKeycapBrand(baseState.keycapBrand);
      setKeyAddOns({}); // Reset keyAddOns
      setCaseFoam("No"); // Reset caseFoam
      setPEFoam("No"); // Reset PEFoam
      setNumTapeLayer(0); // Reset numTapeLayer
  
      localStorage.setItem(getUserStorageKey('keyboardLayout'), baseState.layout);
      localStorage.setItem(getUserStorageKey('keyboardBodyColor'), baseState.bodyColor);
      localStorage.setItem(getUserStorageKey('keyboardSwitchType'), baseState.switchType);
      localStorage.setItem(getUserStorageKey('keyboardKeycapColors'), JSON.stringify(baseState.keycapColors));
      localStorage.setItem(getUserStorageKey('keyboardKeycapBrand'), baseState.keycapBrand);
      localStorage.setItem(getUserStorageKey('keyAddOns'), JSON.stringify({})); // Reset keyAddOns
      localStorage.setItem(getUserStorageKey('caseFoam'), "No"); // Reset caseFoam
      localStorage.setItem(getUserStorageKey('PEFoam'), "No"); // Reset PEFoam
      localStorage.setItem(getUserStorageKey('numTapeLayer'), 0); // Reset numTapeLayer
    }
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('keyboardLayout', layout);
    localStorage.setItem('keyboardBodyColor', bodyColor);
    localStorage.setItem('keyboardSwitchType', switchType);
    localStorage.setItem('keyboardKeycapColors', JSON.stringify(keycapColors));
    localStorage.setItem('keyboardKeycapBrand', keycapBrand);
  }, [layout, bodyColor, switchType, keycapColors, keycapBrand]);

  // Define keycap layouts for Full, TKL, 75%, and 60% keyboards
  const keycapLayouts = {
    full: [
      ['Esc', '', 'F1', 'F2', 'F3', 'F4', '', 'F5', 'F6', 'F7', 'F8', '', 'F9', 'F10', 'F11', 'F12', ' ', 'PrtSc', 'ScrLk', 'Pause'],
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', ' ', 'Ins', 'Home', 'PgUp', '', 'NumLk' ,'Num /', '*', 'Num -'],
      ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', ' ', 'Del', 'End', 'PgDn', '', 'Num7', 'Num8', 'Num9', '+'],
      ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter', ' ', ' ', ' ', ' ', ' ', 'Num4', 'Num5', 'Num6'],
      ['LShift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'RShift', ' ', ' ', '↑', ' ', ' ', 'Num1', 'Num2', 'Num3', 'Num Enter'],
      ['LCtrl', 'LWin', 'LAlt', 'Space', 'RAlt', 'RWin', 'Menu', 'RCtrl', ' ','←', '↓', '→' ,' ', '0 Ins', 'Num Del'],
    ],
    tkl: [
      ['Esc', '', 'F1', 'F2', 'F3', 'F4', '', 'F5', 'F6', 'F7', 'F8', '', 'F9', 'F10', 'F11', 'F12', ' ', 'PrtSc', 'ScrLk', 'Pause'],
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', ' ', 'Ins', 'Home', 'PgUp'],
      ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', ' ', 'Del', 'End', 'PgDn'],
      ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
      ['LShift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'RShift', ' ', ' ', '↑'],
      ['LCtrl', 'LWin', 'LAlt', 'Space', 'RAlt', 'RWin', 'Menu', 'RCtrl', ' ','←', '↓', '→'],
    ],
    '75': [
      ['Esc', '', 'F1', 'F2', 'F3', 'F4', '', 'F5', 'F6', 'F7', 'F8', '', 'F9', 'F10', 'F11', 'F12'],
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
      ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
      ['LShift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'RShift'],
      ['LCtrl', 'LWin', 'LAlt', 'Space', 'RAlt', 'RWin', 'Menu', 'RCtrl'],
    ],
    '60': [
      ['Esc', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
      ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
      ['LShift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'RShift'],
      ['LCtrl', 'LWin', 'LAlt', 'Space', 'RAlt', 'RWin', 'Menu', 'RCtrl'],
    ],
  };

  // Handles Layout changes
  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
  };

  // Handles changes to Keyboard Body Color
  const handleBodyColorChange = (event) => {
    setBodyColor(event.target.value);
  };

  // Handles changes to Key Switches (Blue, Red, Brown, etc.)
  const handleSwitchTypeChange = (event) => {
    setSwitchType(event.target.value);
  };

  // Play sound for the currently selected switch type
  const playSwitchSound = () => {
    switch (switchType) {
      case 'Outemu Brown':
        brownSound.play();
        break;
      case 'Outemu Blue':
        blueSound.play();
        break;
      case 'Outemu Red':
        redSound.play();
        break;
      default:
        break;
    }
  };

  // Handles changes to Keycap Brand
  const handleKeycapBrandChange = (event) => {
    setKeycapBrand(event.target.value);
  };

  // Handle right-click on keycaps
  const handleRightClick = (key, e) => {
    e.preventDefault(); // Prevent the default context menu
    setSelectedKey(key); // Set the selected key
    setShowAddOnsModal(true); // Show the add-ons modal

    // Initialize add-ons for the new key if it doesn't already have any
    if (!keyAddOns[key]) {
      setKeyAddOns((prevAddOns) => ({
        ...prevAddOns,
        [key]: { stabilizers: false, lubing: false, filming: false },
      }));
    }
  };

  // Handle color change for the selected keycap
  const handleKeycapColorChange = (event) => {
    if (selectedKey) {
      setKeycapColors((prevColors) => ({
        ...prevColors,
        [selectedKey]: event.target.value,
      }));
    }
  };

  // Close the add-ons modal
  const closeAddOnsModal = () => {
    setShowAddOnsModal(false);
  };

  // Determine the width of a keycap based on its label
  const getKeycapWidth = (key) => {
    if (key === 'Space') return '305px';
    if (key === 'Backspace') return '104px';
    if (key === '\\') return '62px';
    if (key === 'Tab') return '62px';
    if (key === 'Caps') return '69px';
    if (key === 'LShift' || key === 'RShift') return '119px';
    if (key === 'Enter') return '112px';
    if (key === 'LCtrl' || key === 'RCtrl' || key === 'RAlt' || key === 'LAlt' || key === 'LWin' || key === 'RWin' || key === 'Menu') return '40px';
    if (key === '0 Ins') return '40px';
    if (key === '') return '12px'; // Empty space (non-interactable)
    if (key === ' ') return '20px';
    return '20px'; // Default keycap size
  };

  // Export the keyboard layout as a PNG using dom-to-image
  const exportAsPNG = () => {
    const keyboardElement = document.querySelector('.keyboard-body');
    if (keyboardElement) {
      domtoimage.toPng(keyboardElement)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'keyboard-layout.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error exporting as PNG:', error);
        });
    }
  };

  // Handle the "Order This Design" button click
  const handleOrder = () => {
  
    const stabilizerKeysSet = new Set();
    const lubingKeysSet = new Set();
    const filmingKeysSet = new Set();

    keycapLayouts[layout].forEach((row) => {
      row.forEach((key) => {
        if (key !== '' && key !== ' ') {
          const addOns = keyAddOns[key];
          if (addOns) {
            if (addOns.stabilizers) stabilizerKeysSet.add(key);
            if (addOns.lubing) lubingKeysSet.add(key);
            if (addOns.filming) filmingKeysSet.add(key);
          }
        }
      });
    });

    // Convert Sets to Arrays
    const stabilizerKeys = Array.from(stabilizerKeysSet);
    const lubingKeys = Array.from(lubingKeysSet);
    const filmingKeys = Array.from(filmingKeysSet);  
    // Update the counts
    setNumStabilizer(stabilizerKeys.length);
    setNumSwitchLubing(lubingKeys.length);
    setNumFilming(filmingKeys.length);
  
    // Export the keyboard layout as a PNG
    const keyboardElement = document.querySelector('.keyboard-body');
    if (keyboardElement) {
      domtoimage.toPng(keyboardElement)
        .then((dataUrl) => {
          // Save the Base64 image string to localStorage
          localStorage.setItem('keyboardImage', dataUrl);
  
          // Save other keyboard details to localStorage
          localStorage.setItem('keyboardSwitchType', switchType);
          localStorage.setItem('keyboardLayout', layout);
          localStorage.setItem('keyboardKeycapBrand', keycapBrand);
          localStorage.setItem('keyAddOns', JSON.stringify(keyAddOns));
          localStorage.setItem('caseFoam', caseFoam);
          localStorage.setItem('PEFoam', PEFoam);
          localStorage.setItem('numTapeLayers', numTapeLayer);
  
          // Save counts to localStorage
          localStorage.setItem('numStabilizer', stabilizerKeys.length);
          localStorage.setItem('numSwitchLubing', lubingKeys.length);
          localStorage.setItem('numFilming', filmingKeys.length);
  
          // Save the key lists to localStorage
          localStorage.setItem('stabilizerKeyList', JSON.stringify(stabilizerKeys));
          localStorage.setItem('lubingKeyList', JSON.stringify(lubingKeys));
          localStorage.setItem('filmingKeyList', JSON.stringify(filmingKeys));
  
          // Navigate to the Order page
          navigate("/order");
        })
        .catch((error) => {
          console.error('Error exporting as PNG:', error);
        });
    }
  };

  const saveDesign = async (e) => {
    e.preventDefault();
    const designName = prompt('Enter a name for your design:');
    if (!designName) return;
  
    const keyboardElement = document.querySelector('.keyboard-body');
    if (!keyboardElement) {
      alert('Keyboard element not found.');
      return;
    }
  
    const keycapsColor = JSON.stringify(keycapColors);
    const keyAddOnsData = JSON.stringify(keyAddOns); // Include keyAddOns
  
    try {
      const dataUrl = await domtoimage.toPng(keyboardElement); // Convert the keyboard to a Base64 image
      const keyboardImage = dataUrl;
  
      const response = await fetch(`${API_BASE_URL}/api/designs/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          designName,
          layout,
          bodyColor,
          keycapsColor,
          switchType,
          keycapBrand,
          keyboardImage,
          keyAddOns: keyAddOnsData, // Include keyAddOns
          caseFoam, // Include caseFoam
          PEFoam, // Include PEFoam
          numTapeLayer, // Include numTapeLayer
        }),
      });
  
      const data = await response.json();
      if (response.status === 201) {
        alert('Design saved successfully!');
      } else {
        alert('Failed to save design: ' + data.message);
      }
    } catch (error) {
      alert('Failed to save design.' + error);
    }
  };

  const loadDesigns = async () => {
    try {
      if (!showDesigns) {
        const response = await fetch(`${API_BASE_URL}/api/designs/load/${userEmail}`);
        const data = await response.json();
        if (response.ok) {
          const processedDesigns = data.designs.map(design => ({
            ...design,
            keyAddOns: design.keyAddOns || "{}",
            caseFoam: design.caseFoam || "No",
            PEFoam: design.PEFoam || "No",
            numTapeLayer: design.numTapeLayer || 0
          }));
          setDesigns(processedDesigns);
        } else {
          alert('Failed to load designs OR you have no designs.');
        }
      }
      setShowDesigns(!showDesigns); // Toggle visibility
    } catch (error) {
      console.error('Error loading designs:', error);
      alert('Failed to load designs.');
    }
  };

  // Apply a selected design
  const applyDesign = (design) => {
    setLayout(design.layout);
    setBodyColor(design.bodyColor);
    setKeycapColors(JSON.parse(design.keycapsColor));
    setSwitchType(design.switchType);
    setKeycapBrand(design.keycapBrand);
    setKeyAddOns(JSON.parse(design.keyAddOns || '{}'));
    setCaseFoam(design.caseFoam || "No"); // Load caseFoam
    setPEFoam(design.PEFoam || "No"); // Load PEFoam
    setNumTapeLayer(design.numTapeLayer || 0); // Load numTapeLayer
  };

  const deleteDesign = async (designId) => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/designs/delete/${designId}`, {    // ${API_BASE_URL} or ${API_BASE_URL}
          method: 'DELETE',
        });
  
        if (response.ok) {
          // Remove the deleted design from the state
          setDesigns((prevDesigns) => prevDesigns.filter((design) => design._id !== designId));
          alert('Design deleted successfully!');
        } else {
          alert('Failed to delete design.');
        }
      } catch (error) {
        console.error('Error deleting design:', error);
        alert('An error occurred while deleting the design.');
      }
    }
  };

  return (
    <div className="keyboard-customization">
      <h1>Keyboard Customization</h1>
      <div className="options">
        <div className="option">
          <label>Keyboard Layout:</label>
          <select value={layout} onChange={handleLayoutChange}>
            <option value="full">Full Keyboard</option>
            <option value="tkl">TKL (Tenkeyless)</option>
            <option value="75">75%</option>
            <option value="60">60%</option>
          </select>
        </div>

        <div className="option">
          <label>Main Body Color:</label>
          <input
            type="color"
            value={bodyColor}
            onChange={handleBodyColorChange}
          />
        </div>

        <div className="option">
          <label>Switch Type:</label>
          <select value={switchType} onChange={handleSwitchTypeChange}>
          <option value="N/A">Default</option>
            <option value="Outemu Brown">Outemu Brown</option>
            <option value="Outemu Blue">Outemu Blue</option>
            <option value="Outemu Red">Outemu Red</option>
          </select>
          {/* Button to play switch sound */}
          <button onClick={playSwitchSound} style={{ marginLeft: '10px' }}>Play Sound</button>
        </div>

        <div className="option">
          <label>Keycap Brand:</label>
          <select value={keycapBrand} onChange={handleKeycapBrandChange}>
            <option value="Akko">Akko</option>
            <option value="Drop">Drop</option>
            <option value="YMDK">YMDK</option>
            <option value="HyperX">HyperX</option>
          </select>
        </div>
      </div>

      
      <h2>Add-ons</h2>
      {/* Add-ons Section */}
      <div className="option">
          <div className="add-ons">
            <div className="add-on">
              <label>Tape Mod:</label>
              <input
                type="number"
                value={numTapeLayer}
                onChange={(e) => setNumTapeLayer(Number(e.target.value))}
                min="0"
              />
            </div>
            <div className="add-on">
              <label>Case Foam:</label>
              <select value={caseFoam} onChange={(e) => setCaseFoam(e.target.value)}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="add-on">
              <label>PE Foam:</label>
              <select value={PEFoam} onChange={(e) => setPEFoam(e.target.value)}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        </div>

      <div className="preview">
        <h2>Preview</h2>
        <div
          className="keyboard-body"
          style={{ backgroundColor: bodyColor }}
        >
          <div className="keyboard">
            {keycapLayouts[layout].map((row, rowIndex) => (
              <div key={rowIndex} className="keyboard-row">
                {row.map((key, keyIndex) => (
                  <div
                    key={`${rowIndex}-${keyIndex}`}
                    className={`keycap ${key === '' || key === ' ' ? 'empty' : ''}`}
                    style={{
                      width: getKeycapWidth(key),
                      backgroundColor: key === '' || key === ' ' ? bodyColor : keycapColors[key] || '#FFFFFF',
                    }}
                    onContextMenu={(e) => key !== '' && handleRightClick(key, e)}
                  >
                    {key} {/* Only display the key label */}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p>Switch Type: {switchType}</p>
        <p>Keycap Brand: {keycapBrand}</p>
      </div>

      {/* Color Picker for Keycaps */}
      {selectedKey && (
        <div className="color-picker-box">
          <label className="color-label">Select color for: <span className="key-emphasis">{selectedKey}</span></label>
          <input
            type="color"
            value={keycapColors[selectedKey] || '#FFFFFF'}
            onChange={handleKeycapColorChange}
          />
        </div>
      )}

      {/* Add-ons Modal */}
      {showAddOnsModal && (
        <AddOnsModal
          selectedKey={selectedKey}
          keyAddOns={keyAddOns}
          setKeyAddOns={setKeyAddOns}
          onClose={closeAddOnsModal}
        />
      )}

      {/* Buttons */}
      <div className="actions">
        <button onClick={exportAsPNG}>Export as PNG</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleOrder}>Order this Design</button>
        <button onClick={saveDesign}>Save Design</button>
        <button onClick={loadDesigns}>
          {showDesigns ? 'Hide Designs' : 'Load Design'}
        </button>
      </div>

      {/* Load Designs */}
      {showDesigns && (
        <div className="load-designs">
          {designs.length > 0 ? (
            <div className="designs-list">
              {designs.map((design) => (
                <div key={design._id} className="design-item" onClick={() => applyDesign(design)}>
                  <h3>{design.designName}</h3>
                  <img
                    src={design.keyboardImage}
                    alt={design.designName}
                    style={{ width: '100px', height: 'auto' }}
                  />
                  <p>Layout: {design.layout}</p>
                  <p>Switch Type: {design.switchType}</p>
                  <p>Keycap Brand: {design.keycapBrand}</p>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    deleteDesign(design._id);
                  }} style={{ backgroundColor: "#c82333" }}>Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No designs found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Customize;