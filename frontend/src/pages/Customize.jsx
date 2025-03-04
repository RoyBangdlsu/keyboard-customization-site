import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import domtoimage from 'dom-to-image';
import './customize.css';

function Customize() {

  const navigate = useNavigate();
  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  const baseState = {
    layout: 'full',
    bodyColor: '#000000',
    switchType: 'Default',
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
    }
  }, [layout, bodyColor, switchType, keycapColors, keycapBrand, loggedInUser]);

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
      localStorage.setItem('keyboardLayout', baseState.layout);
      localStorage.setItem('keyboardBodyColor', baseState.bodyColor);
      localStorage.setItem('keyboardSwitchType', baseState.switchType);
      localStorage.setItem('keyboardKeycapColors', JSON.stringify(baseState.keycapColors));
      localStorage.setItem('keyboardKeycapBrand', baseState.keycapBrand);
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
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', ' ', 'Ins', 'Home', 'PgUp', '', 'Num' ,'/', '*', '-'],
      ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', ' ', 'Del', 'End', 'PgDn', '', 'Num7', 'Num8', 'Num9', '+'],
      ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter', ' ', ' ', ' ', ' ', ' ', 'Num4', 'Num5', 'Num6'],
      ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', ' ', ' ', '↑', ' ', ' ', 'Num1', 'Num2', 'Num3', 'Num Enter'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu', 'Ctrl', ' ','←', '↓', '→' ,' ', '0 Ins', 'Num Del'],
    ],
    tkl: [
      ['Esc', '', 'F1', 'F2', 'F3', 'F4', '', 'F5', 'F6', 'F7', 'F8', '', 'F9', 'F10', 'F11', 'F12', ' ', 'PrtSc', 'ScrLk', 'Pause'],
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', ' ', 'Ins', 'Home', 'PgUp'],
      ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', ' ', 'Del', 'End', 'PgDn'],
      ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
      ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift', ' ', ' ', '↑'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu', 'Ctrl', ' ','←', '↓', '→'],
    ],
    '75': [
      ['Esc', '', 'F1', 'F2', 'F3', 'F4', '', 'F5', 'F6', 'F7', 'F8', '', 'F9', 'F10', 'F11', 'F12'],
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
      ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
      ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu', 'Ctrl'],
    ],
    '60': [
      ['Esc', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
      ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
      ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
      ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Win', 'Menu', 'Ctrl'],
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
    setSelectedKey(key); // Set the selected key for color change
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

  // Determine the width of a keycap based on its label
  const getKeycapWidth = (key) => {
    if (key === 'Space') return '305px';
    if (key === 'Backspace') return '104px';
    if (key === '\\') return '62px';
    if (key === 'Tab') return '62px';
    if (key === 'Caps') return '69px';
    if (key === 'Shift') return '119px';
    if (key === 'Enter') return '112px';
    if (key === 'Ctrl' || key === 'Alt' || key === 'Win' || key === 'Menu') return '40px';
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

  // Remaining functionality to be added later
  const handleOrder = () => {
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
    try {
      const dataUrl = await domtoimage.toPng(keyboardElement); // Convert the keyboard to a Base64 image
      const keyboardImage = dataUrl.split(',')[1];

      const response = await fetch(`http://localhost:5000/api/designs/save`, {
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
        }),
      });
  
      const data = await response.json();
      if (response.status === 201) {
        alert('Design saved successfully!');
      } else {
        alert('Failed to save design: ' + data.message);
      }
    } catch(error) {
        alert('Failed to save design.' + error);
    }
  };

  // Load all designs for the logged-in user
  const loadDesigns = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/designs/load/${userEmail}`);
      const data = await response.json();
      if (response.ok) {
        const designsWithImages = data.designs.map((design) => ({
          ...design,
          keyboardImage: `data:${design.keyboardImage.contentType};base64,${design.keyboardImage.data.toString('base64')}`,
        }));
        setDesigns(designsWithImages);
      } else {
        alert('Failed to load designs: ' + data.message);
      }
    } catch (error) {
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
          <option value="Default">Default</option>
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
                    {key}
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
        <div className="color-picker">
          <label>Select color for {selectedKey}:</label>
          <input
            type="color"
            value={keycapColors[selectedKey] || '#FFFFFF'}
            onChange={handleKeycapColorChange}
          />
        </div>
      )}

      {/* Buttons */}
      <div className="actions">
        <button onClick={exportAsPNG}>Export as PNG</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleOrder}>Order this Design</button>
        <button onClick={saveDesign}>Save Design</button>
        <button onClick={loadDesigns}>Load Design</button>
      </div>

      {/* Load Designs */}
      <div className="load-designs">
        {designs.length > 0 && (
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Customize;
