import userModel from "../models/userModel.js";

// add product to user cart
export const addCart = async (req,res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    return res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// update user cart
export const updateCart = async (req,res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userRouter.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// get user cart
export const getUserCart = async (req,res) => {
    try {
        const {userId }= req.body;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;

        res.send({success : true , cartData});
    } catch (error) {
        console.log(error.message);
        res.send({success : true , message : error.message});
    }
};
