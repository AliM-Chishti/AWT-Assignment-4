const express = require("express");
const router = express.Router();
const Delivery = require("../models/Delivery");
const auth = require("../middleware/authMiddleware");


// CREATE
router.post("/", async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    await delivery.save();

    res.status(201).json({
      message: "Delivery created successfully",
      data: delivery
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ ALL
router.get("/", auth, async (req, res) => {
  const deliveries = await Delivery.find();
  res.json(deliveries);
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(delivery);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Delivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.status(200).json({
      message: "Delivery updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Delivery.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    res.status(200).json({
      message: "Delivery deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;