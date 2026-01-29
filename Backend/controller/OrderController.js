import OrderModel from "../models/orderModel.js";

/* =========================
   PLACE ORDER (COD / ONLINE)
========================= */
const placeOrder = async (req, res) => {
  try {
    const { items, address, amount, paymentMethod, paymentStatus } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Items are required"
      });
    }

    const order = new OrderModel({
      userId: req.user.id,
      items,
      address,
      amount,
      paymentMethod,
      paymentStatus: paymentMethod === "online" ? "Paid" : "Pending"
    });

    await order.save();
    await order.populate("items.productId", "name price image");

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   STRIPE PLACE ORDER
========================= */
const placeOrderStripe = async (req, res) => {
  try {
    const { items, address, amount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items are required" });
    }

    const order = new OrderModel({
      userId: req.user.id,
      items,
      address,
      amount,
      paymentMethod,
      paymentStatus: paymentMethod === "online" ? "Paid" : "Pending",
    });
    await order.save();
    await order.populate("items.productId", "name price image");
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   VERIFY STRIPE PAYMENT
========================= */
const verifyStripe = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { paymentStatus: "Paid" },
      { new: true }
    ).populate("items.productId", "name price image");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   GET ALL ORDERS (ADMIN)
========================= */
 const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price image")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   GET USER ORDERS
========================= */
const userOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.user.id })
      .populate("items.productId", "name price image")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================
   UPDATE ORDER STATUS (ADMIN)
========================= */
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("items.productId", "name price");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  allOrders,
  userOrders,
  updateStatus
};
