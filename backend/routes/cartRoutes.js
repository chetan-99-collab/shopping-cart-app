const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * ADD ITEM TO CART
 * POST /carts
 */
router.post("/", auth, async (req, res) => {
  try {
    const { itemId } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    // If cart doesn't exist, create one
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [itemId]
      });
    } else {
      cart.items.push(itemId);
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET USER CART
 * GET /carts
 */
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items");
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
