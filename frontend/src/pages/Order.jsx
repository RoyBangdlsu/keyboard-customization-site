import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [type, setType] = useState("New");
  const [keyboardSize, setKeyboardSize] = useState("N/A"); // Keyboard size
  let [keyboardSizePrice, setKeyboardSizePrice] = useState(0); // Keyboard size price
  const [keyCapBrand, setKeyCapBrand] = useState("N/A"); // Keycap brand
  let [keyCapBrandPrice, setKeyCapBrandPrice] = useState(0); // Keycap brand price
  const [switchType, setSwitchType] = useState("N/A"); // Switch type
  let [switchTypePrice, setSwitchTypePrice] = useState(0); // switch type brand price
  const [address, setAddress] = useState(""); // Address input
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
  
    let calculatedTotal = 0;
  
    if (storedSwitchType) {
      setSwitchType(storedSwitchType);
    }
  
    // Keyboard Size Price Breakdown
    if (storedKeyboardSize === 'full') {
      setKeyboardSize("Full-Sized");
      setKeyboardSizePrice(100);
      calculatedTotal += 100;
    } else if(storedKeyboardSize === 'tkl') {
      setKeyboardSize("TKL (Tenkeyless)");
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
          total, 
          keyboardImage, 
          keyCapBrandPrice,
          keyboardSizePrice, 
          switchTypePrice }),
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
    <div className="p-4">
      <h1 className="text-xl font-bold">Review Order</h1>
        <div>
            <>
            <p>Keyboard Preview</p>
            {/* Display the keyboard image */}
            {keyboardImage && (
              <div className="mt-4">
                <img
                  src={keyboardImage}
                  alt="Custom Keyboard Design"
                  className="mt-2 border border-gray-300 rounded-md"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            )}

              <p>Type of Service: New Customized Keyboard</p>
              <p>Keyboard Size: {keyboardSize} - ₱{keyboardSizePrice.toFixed(2)}</p>
              <p>Keycap Brand: {keyCapBrand} - ₱{keyCapBrandPrice.toFixed(2)}</p>
              <p>Switch Type: {switchType} - ₱{switchTypePrice.toFixed(2)}</p>
            </>
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

          <button onClick={() => navigate("/customize")} className="mt-4 bg-green-500 text-white p-2 rounded-md">
            Edit Keyboard
          </button>
          <button onClick={handlePlaceOrder} className="mt-4 bg-green-500 text-white p-2 rounded-md ml-2">
            Place Order
          </button>
        </div>
    </div>
  );
}

export default Order;
