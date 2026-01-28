import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = ({ token, backendurl, currency }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/order/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log("Order fetch error", error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      await axios.post(
        `http://localhost:4000/api/order/status`,
        { orderId, status: e.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.log("Status update error", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">All Orders</h2>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex justify-between items-start bg-green-50 p-4 rounded-xl"
          >
            {/* LEFT */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <b>Items:</b>{" "}
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </p>

              <p>
                <b>Name:</b> {order.address.name}
              </p>

              <p>
                <b>Address:</b>{" "}
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}
              </p>

              <p>
                <b>Phone:</b> {order.address.phone}
              </p>
            </div>

            {/* MIDDLE */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Total:</span>{" "}
                {order.items.length}
              </p>
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                {order.payment ? "Done" : "Pending"}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-end gap-3">
              <p className="font-semibold">
                Price: {currency}
                {order.amount}
              </p>

              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="p-1 border rounded-md text-sm"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
