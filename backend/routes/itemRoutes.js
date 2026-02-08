const router = require("express").Router();
const Item = require("../models/Item");

// ✅ Create Item
router.post("/", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

// ✅ List Items
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

module.exports = router;
