import React, { useState, useContext, useEffect } from "react";
import { shopcontext } from "../context/Shopcontext";
import { useNavigate } from "react-router-dom";
import Title from "../Components/Title";
import CartTotal from "./CartTotal";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Placeorder() {
  const {
    cartItems,
    clearCart,
    getCartAmount,
    navigate
  } = useContext(shopcontext);

  const cartTotalAmount = getCartAmount();

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
    country: "India"
  });

  // ⛔ SAFETY: wait until cart loads
  if (!cartItems || typeof cartItems !== "object") {
    return <p className="mt-24 text-center">Loading...</p>;
  }

  // Redirect after successful order
  useEffect(() => {
    if (orderSuccess) {
      navigate("/order");
    }
  }, [orderSuccess, navigate]);

  // Build items array from cart (FLATTEN SIZE)
  const buildItemsArray = () => {
    const items = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const qty = cartItems[productId][size];
        if (qty > 0) {
          items.push({
            productId,
            size,
            quantity: qty
          });
        }
      }
    }
    return items;
  };

  // Send order to backend
  const sendOrderToBackend = async () => {
    try {
      const itemsArray = buildItemsArray();

      if (itemsArray.length === 0) {
        toast.error("Cart is empty");
        return false;
      }

      const res = await fetch("http://localhost:4000/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          items: itemsArray,
          address,
          amount: cartTotalAmount,
          paymentMethod
        })
      });

      const data = await res.json();
      return data.success;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // Online payment
  const handleOnlinePayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Razorpay failed to load");
      return;
    }

    const options = {
      key: "rzp_test_S5bXbrAARs4h5m",
      amount: cartTotalAmount * 100,
      currency: "INR",
      name: "My Shop",
      description: "Order Payment",
      handler: async () => {
        const success = await sendOrderToBackend();
        if (success) {
          toast.success("Payment successful");
          clearCart();
          setOrderSuccess(true);
        } else {
          toast.error("Order failed");
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Cash on Delivery
  const handleCOD = async () => {
    const success = await sendOrderToBackend();
    if (success) {
      toast.success("Order placed successfully");
      clearCart();
      setOrderSuccess(true);
    } else {
      toast.error("Order failed");
    }
  };

  const placeOrder = (e) => {
    e.preventDefault();
    paymentMethod === "online" ? handleOnlinePayment() : handleCOD();
  };

  return (
    <section className="max-padd-container mt-24">
      <form className="py-6" onSubmit={placeOrder}>
        <div className="flex flex-col xl:flex-row gap-20">

          {/* ADDRESS */}
          <div className="flex flex-1 flex-col gap-3">
            <Title title1="Delivery" title2="Information" titlestyles="h3" />

            <input placeholder="Full Name" required
              onChange={(e) => setAddress({ ...address, name: e.target.value })} className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none"/>

            <input type="email" placeholder="Email" required
              onChange={(e) => setAddress({ ...address, email: e.target.value })} className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none"/>

            <input placeholder="Street Address" required
              onChange={(e) => setAddress({ ...address, street: e.target.value })} className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none"/>

            <input placeholder="City" required
              onChange={(e) => setAddress({ ...address, city: e.target.value })} className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none" />

            <input placeholder="Pincode" required
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none"/>

            <input placeholder="Phone" required
              onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-deep outline-none" />
          </div>

          {/* PAYMENT */}
          <div className="flex flex-1 flex-col">
            <CartTotal />

            <div className="my-6">
              <label>
                <input
                  type="radio"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                /> Online
              </label>

              <br />

              <label>
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                /> Cash on Delivery
              </label>
            </div>

            <button type="submit" className="btn-dark">
              {paymentMethod === "online"
                ? `Pay ₹${cartTotalAmount}`
                : `Place Order ₹${cartTotalAmount}`}
            </button>
          </div>

        </div>
      </form>
      <Footer />
    </section>
  );
}














