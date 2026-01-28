import React, { useContext, useEffect, useState } from "react";
import { shopcontext } from "../context/Shopcontext";
import { toast } from "react-toastify";
import Title from "../Components/Title";

export default function Order() {
  const { backendurl, token, currency } = useContext(shopcontext);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadorderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch(`${backendurl}/api/order/userorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        let allOrdersItem = [];

        data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              paymentMethod: order.paymentMethod,
              date: order.createdAt,
            });
          });
        });

        setOrderItems(allOrdersItem);
      } else {
        setOrderItems([]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadorderData();
  }, [token]);

  if (loading) {
    return <p className="mt-24 text-center">Loading orders...</p>;
  }

  return (
    <section className="max-padd-container mt-24">
      <Title title1="Orders" title2="List" titlestyles="h3" />

      {orderItems.length === 0 ? (
        <p className="mt-6">No orders found</p>
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          {orderItems.map((item, i) => (
            <div
              key={i}
              className="flex justify-between text-gray-700 items-center bg-deep p-4 rounded-xl"
            >
              {/* LEFT */}
              <div className="flex gap-x-3 w-full">
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex flex-col gap-1 text-sm">
                  <h5 className="font-semibold">
                    {item.productId?.name}
                  </h5>

                  <p>
                    Price: {currency}
                    {item.productId?.price?.[item.size]}
                  </p>

                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>

                  <p>
                    Date:{" "}
                    {new Date(item.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </p>

                  <p>Payment: {item.paymentMethod}</p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  {item.status}
                </div>

                <button className="bg-green-700 text-white px-4 py-1 rounded-xl w-36 text-sm hover:bg-green-800 transition" onClick={loadorderData}>
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
