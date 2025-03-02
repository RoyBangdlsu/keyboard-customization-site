import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [type, setType] = useState("New");
  const [keyboardSize, setKeyboardSize] = useState("N/A"); // Keyboard size
  const [keyCapBrand, setKeyCapBrand] = useState("N/A"); // Keycap brand
  const [switchType, setSwitchType] = useState("N/A"); // Switch type
  const [address, setAddress] = useState(""); // Address input
  const [keyboardImage, setKeyboardImage] = useState(""); // Address input
  let [total, setTotal] = useState(0); // Total cost

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedSwitchType = localStorage.getItem("keyboardSwitchType");
    const storedKeyboardSize = localStorage.getItem("keyboardLayout");
    const storedKeyboardImage = localStorage.getItem("keyboardImage");

    if (storedSwitchType) {
      setSwitchType(storedSwitchType);
    }

    if (storedKeyboardSize === 'full') {
      setKeyboardSize("Full-Sized");
      setTotal(total=100);
    } else if(storedKeyboardSize === 'tkl') {
      setKeyboardSize("TKL (Tenkeyless)");
      setTotal(total=50);
    } else if(storedKeyboardSize === '60') {
      setKeyboardSize("60%");
      setTotal(total=25);
    }

    if (storedKeyboardImage) {
      setKeyboardImage(storedKeyboardImage); // Set the image in state
    }
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
      const resNew = await fetch("http://localhost:5000/api/orders/placeneworder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, customerEmail, address, type, keyboardSize, keyCapBrand, switchType, total, keyboardImage }),
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
              <p>Keyboard Size: {keyboardSize}</p>
              <p>Keycap Brand: {keyCapBrand}</p>
              <p>Switch Type: {switchType}</p>
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
