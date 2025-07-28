import OrdersModel from "../models/OrdersModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing orders using COD METHOD
export const placeOrder = async (req, res) => {
  try {
    const { userId, item, amount, address } = req.body;
    
    const orderData = {
      userId,
      item,
      amount, // ✅ add this
      address, // ✅ add this
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed", // ✅ or "Pending", depending on your app logic
      date: Date.now(),
    };

    const newOrder = new OrdersModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// placing orders using stripe method
export const placeOrderStripe = async (req, res) => {
  try {
  const { userId, item, amount, address } = req.body;
  const {origin} = req.headers
} catch (error) {
  
}



};

// placing orders using razorpay method
export const placeOrderRazorpay = async (req, res) => {};

// all order data for admin panel
  export const allOrders = async (req, res) => {
    try {
      const orders = await OrdersModel.find({});
      res.json({ success: true, orders });
      console.log(orders , 'backend orders');
    } catch (error) {
      res.json({ success: false, message : error.message });
      console.log(error.message);
      toast.error(error.message);
    }
  };

// user order data for frontend
export const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await OrdersModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// update status from admin panel
export const updateStatus = async (req, res) => {
try {
    const {orderId , status} = req.body
  await OrdersModel.findByIdAndUpdate(orderId , {status})
  res.json({success : true , message : "Status Updated"})
} catch (error) {
  console.log(error.message);
  toast.error(error.message)
}
};
