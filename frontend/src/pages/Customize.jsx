import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import domtoimage from 'dom-to-image';
import './customize.css';

// Help Tooltip Component
const HelpTooltip = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="help-tooltip-container">
      <span 
        className="help-icon"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        ?
      </span>
      {isVisible && (
        <div className="help-tooltip">
          {content}
        </div>
      )}
    </div>
  );
};

// Define the AddOnsModal component with tooltips
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
          <div className="column1">
            Stabilizers:
            <HelpTooltip content="Add stabilizers for larger keys (like Space, Shift, Enter) to prevent wobble and improve consistency" />
          </div>
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
          <div className="column1">
            Switch Lubing:
            <HelpTooltip content="Apply lubricant to switches for smoother keypresses and reduced friction noise" />
          </div>
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
          <div className="column1">
            Filming:
            <HelpTooltip content="Install switch films to reduce housing wobble and improve sound consistency" />
          </div>
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
    keycapBrand: 'Akko',
  };

  const loggedInUser = localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user.email;

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
  );
  const [showAddOnsModal, setShowAddOnsModal] = useState(false);
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
  let brownSound = new Audio('./sounds/brown.wav');
  let blueSound = new Audio('./sounds/blue.wav');
  let redSound = new Audio('./sounds/red.wav');

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem(getUserStorageKey('keyboardLayout'), layout);
      localStorage.setItem(getUserStorageKey('keyboardBodyColor'), bodyColor);
      localStorage.setItem(getUserStorageKey('keyboardSwitchType'), switchType);
      localStorage.setItem(getUserStorageKey('keyboardKeycapColors'), JSON.stringify(keycapColors));
      localStorage.setItem(getUserStorageKey('keyboardKeycapBrand'), keycapBrand);
      localStorage.setItem(getUserStorageKey('keyAddOns'), JSON.stringify(keyAddOns));
      localStorage.setItem(getUserStorageKey('caseFoam'), caseFoam);
      localStorage.setItem(getUserStorageKey('PEFoam'), PEFoam);
      localStorage.setItem(getUserStorageKey('numTapeLayer'), numTapeLayer);
    }
  }, [layout, bodyColor, switchType, keycapColors, keycapBrand, keyAddOns, caseFoam, PEFoam, numTapeLayer, loggedInUser]);

  if (!loggedInUser) {
    return <div>Please log in to customize your keyboard.</div>;
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset this design?')) {
      setLayout(baseState.layout);
      setBodyColor(baseState.bodyColor);
      setSwitchType(baseState.switchType);
      setKeycapColors(baseState.keycapColors);
      setKeycapBrand(baseState.keycapBrand);
      setKeyAddOns({});
      setCaseFoam("No");
      setPEFoam("No");
      setNumTapeLayer(0);
  
      localStorage.setItem(getUserStorageKey('keyboardLayout'), baseState.layout);
      localStorage.setItem(getUserStorageKey('keyboardBodyColor'), baseState.bodyColor);
      localStorage.setItem(getUserStorageKey('keyboardSwitchType'), baseState.switchType);
      localStorage.setItem(getUserStorageKey('keyboardKeycapColors'), JSON.stringify(baseState.keycapColors));
      localStorage.setItem(getUserStorageKey('keyboardKeycapBrand'), baseState.keycapBrand);
      localStorage.setItem(getUserStorageKey('keyAddOns'), JSON.stringify({}));
      localStorage.setItem(getUserStorageKey('caseFoam'), "No");
      localStorage.setItem(getUserStorageKey('PEFoam'), "No");
      localStorage.setItem(getUserStorageKey('numTapeLayer'), 0);
    }
  };

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

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
  };

  const handleBodyColorChange = (event) => {
    setBodyColor(event.target.value);
  };

  const handleSwitchTypeChange = (event) => {
    setSwitchType(event.target.value);
  };

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

  const handleKeycapBrandChange = (event) => {
    setKeycapBrand(event.target.value);
  };

  const handleRightClick = (key, e) => {
    e.preventDefault();
    setSelectedKey(key);
    setShowAddOnsModal(true);

    if (!keyAddOns[key]) {
      setKeyAddOns((prevAddOns) => ({
        ...prevAddOns,
        [key]: { stabilizers: false, lubing: false, filming: false },
      }));
    }
  };

  const handleKeycapColorChange = (event) => {
    if (selectedKey) {
      setKeycapColors((prevColors) => ({
        ...prevColors,
        [selectedKey]: event.target.value,
      }));
    }
  };

  const closeAddOnsModal = () => {
    setShowAddOnsModal(false);
  };

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
    if (key === '') return '12px';
    if (key === ' ') return '20px';
    return '20px';
  };

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

    const stabilizerKeys = Array.from(stabilizerKeysSet);
    const lubingKeys = Array.from(lubingKeysSet);
    const filmingKeys = Array.from(filmingKeysSet);  
    setNumStabilizer(stabilizerKeys.length);
    setNumSwitchLubing(lubingKeys.length);
    setNumFilming(filmingKeys.length);
  
    const keyboardElement = document.querySelector('.keyboard-body');
    if (keyboardElement) {
      domtoimage.toPng(keyboardElement)
        .then((dataUrl) => {
          localStorage.setItem('keyboardImage', dataUrl);
          localStorage.setItem('keyboardSwitchType', switchType);
          localStorage.setItem('keyboardLayout', layout);
          localStorage.setItem('keyboardKeycapBrand', keycapBrand);
          localStorage.setItem('keyAddOns', JSON.stringify(keyAddOns));
          localStorage.setItem('caseFoam', caseFoam);
          localStorage.setItem('PEFoam', PEFoam);
          localStorage.setItem('numTapeLayer', numTapeLayer);
          localStorage.setItem('numStabilizer', stabilizerKeys.length);
          localStorage.setItem('numSwitchLubing', lubingKeys.length);
          localStorage.setItem('numFilming', filmingKeys.length);
          localStorage.setItem('stabilizerKeyList', JSON.stringify(stabilizerKeys));
          localStorage.setItem('lubingKeyList', JSON.stringify(lubingKeys));
          localStorage.setItem('filmingKeyList', JSON.stringify(filmingKeys));
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
    const keyAddOnsData = JSON.stringify(keyAddOns);
  
    try {
      const dataUrl = await domtoimage.toPng(keyboardElement);
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
          keyAddOns: keyAddOnsData,
          caseFoam,
          PEFoam,
          numTapeLayer,
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
      setShowDesigns(!showDesigns);
    } catch (error) {
      console.error('Error loading designs:', error);
      alert('Failed to load designs.');
    }
  };

  const applyDesign = (design) => {
    setLayout(design.layout);
    setBodyColor(design.bodyColor);
    setKeycapColors(JSON.parse(design.keycapsColor));
    setSwitchType(design.switchType);
    setKeycapBrand(design.keycapBrand);
    setKeyAddOns(JSON.parse(design.keyAddOns || '{}'));
    setCaseFoam(design.caseFoam || "No");
    setPEFoam(design.PEFoam || "No");
    setNumTapeLayer(design.numTapeLayer || 0);
  };

  const deleteDesign = async (designId) => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/designs/delete/${designId}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
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
      <div className="option">
        <div className="add-ons">
          <div className="add-on">
            <label>
              Tape Mod:
              <HelpTooltip content="Number of tape layers applied under the PCB to modify sound (typically 1-3 layers)" />
            </label>
            <input
              type="number"
              value={numTapeLayer}
              onChange={(e) => setNumTapeLayer(Number(e.target.value))}
              min="0"
            />
          </div>
          <div className="add-on">
            <label>
              Case Foam:
              <HelpTooltip content="Dampening foam placed in the keyboard case to reduce echo and improve sound" />
            </label>
            <select value={caseFoam} onChange={(e) => setCaseFoam(e.target.value)}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="add-on">
            <label>
              PE Foam:
              <HelpTooltip content="Thin polyethylene foam between PCB and plate for sound dampening" />
            </label>
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

      {showAddOnsModal && (
        <AddOnsModal
          selectedKey={selectedKey}
          keyAddOns={keyAddOns}
          setKeyAddOns={setKeyAddOns}
          onClose={closeAddOnsModal}
        />
      )}

      <div className="actions">
        <button onClick={exportAsPNG}>Export as PNG</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleOrder}>Order this Design</button>
        <button onClick={saveDesign}>Save Design</button>
        <button onClick={loadDesigns}>
          {showDesigns ? 'Hide Designs' : 'Load Design'}
        </button>
      </div>

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