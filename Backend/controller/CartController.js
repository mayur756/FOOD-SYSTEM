import userModel from "../models/UserModel.js";

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { itemId, size } = req.body;

    const user = await userModel.findById(userId);

    if (!user.cartData) user.cartData = {};
    if (!user.cartData[itemId]) user.cartData[itemId] = {};

    if (user.cartData[itemId][size]) {
      user.cartData[itemId][size] += 1;
    } else {
      user.cartData[itemId][size] = 1;
    }

    user.markModified("cartData"); 
    await user.save();

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// UPDATE CART
const updateToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size, quantity } = req.body;

    const user = await userModel.findById(userId);

    if (!user.cartData[itemId]) user.cartData[itemId] = {};
    user.cartData[itemId][size] = quantity;

    user.markModified("cartData");
    await user.save();

    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// GET USER CART
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateToCart, getUserCart,clearCart };
