import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    size: String,
    quantity: Number
  }
],           
  address: Object,
  amount: Number,
  paymentMethod: String,
  paymentStatus: String,
  status: { type: String, default: "Order Placed" }
}, { timestamps: true });



export default mongoose.model("Order", orderSchema);  
