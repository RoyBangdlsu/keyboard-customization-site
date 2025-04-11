import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import domtoimage from 'dom-to-image';
import "./Orders.css";

function Order() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [type, setType] = useState("New Customized Keyboard");
  const [keyboardSize, setKeyboardSize] = useState("N/A"); // Keyboard size
  let [keyboardSizePrice, setKeyboardSizePrice] = useState(0); // Keyboard size price
  const [keyCapBrand, setKeyCapBrand] = useState("N/A"); // Keycap brand
  let [keyCapBrandPrice, setKeyCapBrandPrice] = useState(0); // Keycap brand price
  const [switchType, setSwitchType] = useState("N/A"); // Switch type
  let [switchTypePrice, setSwitchTypePrice] = useState(0); // switch type brand price
  const [numSwitchLubing, setNumSwitchLubing] = useState(0); // Number of switches for lubing
  const [switchLubingPrice, setSwitchLubingPrice] = useState(0); // Number of switches for lubing
  const [numFilming, setNumFilming] = useState(0); // Number of films
  const [filmingPrice, setFilmingPrice] = useState(0); // Number of switches for lubing
  const [numStabilizer, setNumStabilizer] = useState(0); // Number of stabilizers
  const [stabilizerPrice, setStabilizerPrice] = useState(0); // Number of switches for lubing
  const [numTapeLayer, setNumTapeLayer] = useState(0); // Number of tape layers
  const [tapeLayerPrice, setTapeLayerPrice] = useState(0); // Number of switches for lubing
  const [caseFoam, setCaseFoam] = useState(""); // Case Foam choice
  const [PEFoam, setPEFoam] = useState(""); // PE Foam choice
  const [address, setAddress] = useState(""); // Address input
  const [stabilizerKeyList, setStabilizerKeyList] = useState([]);
  const [lubingKeyList, setLubingKeyList] = useState([]);
  const [filmingKeyList, setFilmingKeyList] = useState([]);
  const [keyboardImage, setKeyboardImage] = useState(""); // Address input
  const [total, setTotal] = useState(0); // Total cost

  const API_BASE_URL = "https://cobskeebsback.onrender.com";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedSwitchType = localStorage.getItem("keyboardSwitchType");
    const storedKeyboardSize = localStorage.getItem("keyboardLayout");
    const storedKeycapBrand = localStorage.getItem("keyboardKeycapBrand");
    const storedKeyboardImage = localStorage.getItem("keyboardImage");
    const storedNumStabilizers = localStorage.getItem("numStabilizer");
    const storedNumFilming = localStorage.getItem("numFilming");
    const storedNumSwitchLubing = localStorage.getItem("numSwitchLubing");
    const storedNumTapeLayer = localStorage.getItem("numTapeLayer");
    const storedPEFoam = localStorage.getItem("PEFoam");
    const storedCaseFoam = localStorage.getItem("caseFoam");
    const storedStabilizerKeys = JSON.parse(localStorage.getItem('stabilizerKeyList') || '[]');
    const storedLubingKeys = JSON.parse(localStorage.getItem('lubingKeyList') || '[]');
    const storedFilmingKeys = JSON.parse(localStorage.getItem('filmingKeyList') || '[]');
    
    setStabilizerKeyList(storedStabilizerKeys);
    setLubingKeyList(storedLubingKeys);
    setFilmingKeyList(storedFilmingKeys);
  
    let calculatedTotal = 0;
  
    if (storedSwitchType) {
      setSwitchType(storedSwitchType);
    }

    if (storedNumTapeLayer) {
      setNumTapeLayer(storedNumTapeLayer);
      setTapeLayerPrice(storedNumTapeLayer * 10);
      calculatedTotal += storedNumTapeLayer * 10;
    }

    if (storedPEFoam) {
      setPEFoam(storedPEFoam);
      if(storedPEFoam === 'Yes') {
        calculatedTotal += 50;
      }
    }

    if (storedCaseFoam) {
      setCaseFoam(storedCaseFoam);
      if(storedCaseFoam === "Yes") {
        calculatedTotal += 50;
      }
    }

    if (storedNumStabilizers) {
      setNumStabilizer(storedNumStabilizers);
      setStabilizerPrice(storedNumStabilizers * 50);
      calculatedTotal += storedNumStabilizers * 50;
    }
    if (storedNumFilming) {
      setNumFilming(storedNumFilming);
      setFilmingPrice(storedNumFilming * 6);
      calculatedTotal += storedNumFilming * 6;
    }
    if (storedNumSwitchLubing) {
      setNumSwitchLubing(storedNumSwitchLubing);
      setSwitchLubingPrice(storedNumSwitchLubing * 8);
      calculatedTotal += storedNumSwitchLubing * 8;
    }
  
    // Keyboard Size Price Breakdown
    if (storedKeyboardSize === 'full') {
      setKeyboardSize("Full-Sized");
      setKeyboardSizePrice(200);
      calculatedTotal += 200;
    } else if(storedKeyboardSize === 'tkl') {
      setKeyboardSize("TKL (Tenkeyless)");
      setKeyboardSizePrice(100);
      calculatedTotal += 100;
    }  else if(storedKeyboardSize === '75') {
      setKeyboardSize("75%");
      setKeyboardSizePrice(50);
      calculatedTotal += 50;
    } else if(storedKeyboardSize === '60') {
      setKeyboardSize("60%");
      setKeyboardSizePrice(25);
      calculatedTotal += 25;
    }
  
    // Keycap Brand Price Breakdown
    if(storedKeycapBrand === 'Akko') {
      setKeyCapBrand(storedKeycapBrand);
      if(storedKeyboardSize === 'full') {
        setKeyCapBrandPrice(20.77 * 104);
        calculatedTotal += 20.77 * 104;
      } else if (storedKeyboardSize === 'tkl') {
        setKeyCapBrandPrice(20.77 * 87);
        calculatedTotal += 20.77 * 87;
      } else if (storedKeyboardSize === '75') {
        setKeyCapBrandPrice(20.77 * 75);
        calculatedTotal += 20.77 * 75;
      } else if (storedKeyboardSize === '60') {
        setKeyCapBrandPrice(20.77 * 61);
        calculatedTotal += 20.77 * 61;
      }
    }
  
    if(storedKeycapBrand === 'Drop') {
      setKeyCapBrand(storedKeycapBrand);
      if(storedKeyboardSize === 'full') {
        setKeyCapBrandPrice(79.25 * 104);
        calculatedTotal += 79.25 * 104;
      } else if (storedKeyboardSize === 'tkl') {
        setKeyCapBrandPrice(79.25 * 87);
        calculatedTotal += 79.25 * 87;
      } else if (storedKeyboardSize === '75') {
        setKeyCapBrandPrice(79.25 * 75);
        calculatedTotal += 79.25 * 75;
      } else if (storedKeyboardSize === '60') {
        setKeyCapBrandPrice(79.25 * 61);
        calculatedTotal += 79.25 * 61;
      }
    }
  
    if(storedKeycapBrand === 'YMDK') {
      setKeyCapBrand(storedKeycapBrand);
      if(storedKeyboardSize === 'full') {
        setKeyCapBrandPrice(13.04 * 104);
        calculatedTotal += 13.04 * 104;
      } else if (storedKeyboardSize === 'tkl') {
        setKeyCapBrandPrice(13.04 * 87);
        calculatedTotal += 13.04 * 87;
      } else if (storedKeyboardSize === '75') {
        setKeyCapBrandPrice(13.04 * 75);
        calculatedTotal += 13.04 * 75;
      } else if (storedKeyboardSize === '60') {
        setKeyCapBrandPrice(13.04 * 61);
        calculatedTotal += 13.04 * 61;
      }
    }
  
    if(storedKeycapBrand === 'HyperX') {
      setKeyCapBrand(storedKeycapBrand);
      if(storedKeyboardSize === 'full') {
        setKeyCapBrandPrice(117.71 * 104);
        calculatedTotal += 117.71 * 104;
      } else if (storedKeyboardSize === 'tkl') {
        setKeyCapBrandPrice(117.71 * 87);
        calculatedTotal += 117.71 * 87;
      } else if (storedKeyboardSize === '75') {
        setKeyCapBrandPrice(117.71 * 75);
        calculatedTotal += 117.71 * 75;
      } else if (storedKeyboardSize === '60') {
        setKeyCapBrandPrice(117.71 * 61);
        calculatedTotal += 117.71 * 61;
      }
    }
  
    // Switch Type Price Breakdown
    if(storedSwitchType === 'Outemu Blue') {
      setSwitchType(storedSwitchType);
      if(storedKeyboardSize === 'full') {
        setSwitchTypePrice(3.87 * 104);
        calculatedTotal += 3.87 * 104;
      } else if (storedKeyboardSize === 'tkl') {
        setSwitchTypePrice(3.87 * 87);
        calculatedTotal += 3.87 * 87;
      } else if (storedKeyboardSize === '75') {
        setSwitchTypePrice(3.87 * 75);
        calculatedTotal += 3.87 * 75;
      } else if (storedKeyboardSize === '60') {
        setSwitchTypePrice(3.87 * 61);
        calculatedTotal += 3.87 * 61;
      }
    }
  
    if(storedSwitchType === 'Outemu Red') {
      setSwitchType(storedSwitchType);
      if(storedKeyboardSize === 'full') {
        setSwitchTypePrice(3.76 * 104);
        calculatedTotal += 3.76 * 104;
      } else if (storedKeyboardSize === 'tkl') {
        setSwitchTypePrice(3.76 * 87);
        calculatedTotal += 3.76 * 87;
      } else if (storedKeyboardSize === '75') {
        setSwitchTypePrice(3.76 * 75);
        calculatedTotal += 3.76 * 75;
      } else if (storedKeyboardSize === '60') {
        setSwitchTypePrice(3.76 * 61);
        calculatedTotal += 3.76 * 61;
      }
    }
  
    if(storedSwitchType === 'Outemu Brown') {
      setSwitchType(storedSwitchType);
      if(storedKeyboardSize === 'full') {
        setSwitchTypePrice(3.86 * 104);
        calculatedTotal += 3.86 * 104;
      } else if (storedKeyboardSize === 'tkl') {
        setSwitchTypePrice(3.86 * 87);
        calculatedTotal += 3.86 * 87;
      } else if (storedKeyboardSize === '75') {
        setSwitchTypePrice(3.86 * 75);
        calculatedTotal += 3.86 * 75;
      } else if (storedKeyboardSize === '60') {
        setSwitchTypePrice(3.86 * 61);
        calculatedTotal += 3.86 * 61;
      }
    }
  
    if (storedKeyboardImage) {
      setKeyboardImage(storedKeyboardImage); // Set the image in state
    }
  
    // Set the total price
    setTotal(calculatedTotal);
  
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Check if the address is empty
    if (!address.trim()) {
      alert("Please enter your address before placing the order.");
      return; // Exit the function early if the address is empty
    }

    alert("Order Processing Please Wait... Click Ok");

    // Proceed with placing the order if the address is provided
    const resNew = await fetch(`${API_BASE_URL}/api/orders/placeneworder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        customerName, 
        customerEmail, 
        address, 
        type, 
        keyboardSize, 
        keyCapBrand, 
        switchType,
        numSwitchLubing,
        switchLubingPrice,
        numFilming,
        filmingPrice,
        numStabilizer,
        stabilizerPrice,
        numTapeLayer,
        tapeLayerPrice,
        caseFoam,
        PEFoam,
        total, 
        keyboardImage, 
        keyCapBrandPrice,
        keyboardSizePrice, 
        switchTypePrice,
        stabilizerKeys: JSON.stringify(stabilizerKeyList),
        lubingKeys: JSON.stringify(lubingKeyList),
        filmingKeys: JSON.stringify(filmingKeyList)
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
  };

  if (!user) {
    return <p className="text-center mt-10 text-xl">No user found. Please log in.</p>;
  }

  const customerName = user.name;
  const customerEmail = user.email;

  return (
    <div className="body-wrap">
      <div className="container">
        <div className="content">
          {/* The main white box */}
          <table className="main" width="100%" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td className="content-wrap aligncenter">
                  <table width="100%" cellPadding="0" cellSpacing="0">
                    <tbody>
                      {/* Heading */}
                      <tr>
                        <td className="content-block">
                          <h2>Thanks for using our app</h2>
                        </td>
                      </tr>

                      {/* Invoice details */}
                      <tr>
                        <td className="content-block">
                          <table className="invoice">
                            <tbody>
                              <tr>
                                <td>
                                  {/* Basic info: you can change this to your own data */}
                                  {customerName} <br />
                                  {customerEmail} <br />
                                  {new Date().toLocaleDateString()}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table
                                    className="invoice-items"
                                    cellPadding="0"
                                    cellSpacing="0"
                                  >
                                    <tbody>
                                      {/* If you want to show a keyboard preview image */}
                                      {keyboardImage && (
                                        <tr>
                                          <td colSpan={2} style={{ textAlign: "center" }}>
                                            <img
                                              src={keyboardImage}
                                              alt="Custom Keyboard Design"
                                              style={{ maxWidth: "100%", height: "auto" }}
                                            />
                                          </td>
                                        </tr>
                                      )}

                                      {/* Keyboard Size */}
                                      <tr>
                                        <td>Keyboard Size: {keyboardSize}</td>
                                        <td className="alignright">
                                          ₱{keyboardSizePrice.toFixed(2)}
                                        </td>
                                      </tr>

                                      {/* Keycap Brand */}
                                      <tr>
                                        <td>Keycap Brand: {keyCapBrand}</td>
                                        <td className="alignright">
                                          ₱{keyCapBrandPrice.toFixed(2)}
                                        </td>
                                      </tr>

                                      {/* Switch Type */}
                                      <tr>
                                        <td>Switch Type: {switchType}</td>
                                        <td className="alignright">
                                          ₱{switchTypePrice.toFixed(2)}
                                        </td>
                                      </tr>

                                      {/* Lubing */}
                                      <tr>
                                        <td>
                                          Switch Lubing: {lubingKeyList.length} keys
                                          {lubingKeyList.length > 0 && (
                                            <div style={{ fontSize: "0.9em", color: "#666" }}>
                                              Lubed keys: {lubingKeyList.join(", ")}
                                            </div>
                                          )}
                                        </td>
                                        <td className="alignright">
                                          ₱{switchLubingPrice.toFixed(2)}
                                        </td>
                                      </tr>

                                      {/* Filming */}
                                      <tr>
                                        <td>
                                          Filming: {filmingKeyList.length} keys
                                          {filmingKeyList.length > 0 && (
                                            <div style={{ fontSize: "0.9em", color: "#666" }}>
                                              Filmed keys: {filmingKeyList.join(", ")}
                                            </div>
                                          )}
                                        </td>
                                        <td className="alignright">
                                          ₱{filmingPrice.toFixed(2)}
                                        </td>
                                      </tr>

                                      {/* Stabilizers */}
                                      <tr>
                                        <td>
                                          Stabilizers: {numStabilizer} keys
                                          {stabilizerKeyList.length > 0 && (
                                            <div style={{ fontSize: "0.9em", color: "#666" }}>
                                              Keys with stabilizers: {stabilizerKeyList.join(", ")}
                                            </div>
                                          )}
                                        </td>
                                        <td className="alignright">
                                          ₱{stabilizerPrice.toFixed(2)}
                                        </td>
                                      </tr>

                                      {/* Tape Layer */}
                                      <tr>
                                        <td>Tape Layer: {numTapeLayer}</td>
                                        <td className="alignright">
                                          ₱{tapeLayerPrice.toFixed(2)}
                                        </td>
                                      </tr>

                                      {/* Case Foam */}
                                      <tr>
                                        <td>Case Foam: {caseFoam === "Yes" ? "Yes (₱50)" : "No"}</td>
                                        <td className="alignright">
                                          {caseFoam === "Yes" ? "₱50.00" : "₱0.00"}
                                        </td>
                                      </tr>

                                      {/* PE Foam */}
                                      <tr>
                                        <td>PE Foam: {PEFoam === "Yes" ? "Yes (₱50)" : "No"}</td>
                                        <td className="alignright">
                                          {PEFoam === "Yes" ? "₱50.00" : "₱0.00"}
                                        </td>
                                      </tr>

                                      {/* Total */}
                                      <tr className="total">
                                        <td className="alignright" width="80%">
                                          Total
                                        </td>
                                        <td className="alignright">
                                          ₱{total.toFixed(2)}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      {/* Address input */}
                      <tr>
                        <td className="content-block">
                          <div>
                            <label
                              htmlFor="address"
                              style={{
                                display: "block",
                                marginBottom: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              id="address"
                              name="address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                              }}
                            />
                          </div>
                        </td>
                      </tr>

                      {/* Action buttons */}
                      <tr>
                        <td className="content-block">
                          <button
                            onClick={() => navigate("/customize")}
                            style={{
                              marginRight: "10px",
                              padding: "10px 20px",
                              backgroundColor: "#38a169",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Edit Keyboard
                          </button>
                          <button
                            onClick={handlePlaceOrder}
                            style={{
                              padding: "10px 20px",
                              backgroundColor: "#38a169",
                              color: "#fff",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Place Order
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Footer */}
          <div className="footer">
            <table width="100%">
              <tbody>
                <tr>
                  <td className="aligncenter content-block">
                    Questions? Email <a href="mailto:support@company.inc">johnjacob03.jjp@gmail.com</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;