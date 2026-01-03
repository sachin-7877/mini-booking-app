const express = require("express");
const fs = require("fs");
const router = express.Router();

const DATA_PATH = "./data/slots.json";

router.get("/", (req, res) => {
  const slots = JSON.parse(fs.readFileSync(DATA_PATH));
  res.json(slots);
});

router.post("/book/:id", (req, res) => {
  const slots = JSON.parse(fs.readFileSync(DATA_PATH));
  const slot = slots.find(s => s.id === Number(req.params.id));

  if (!slot || !slot.available) {
    return res.status(400).json({ message: "Slot not available" });
  }

  slot.available = false;
  fs.writeFileSync(DATA_PATH, JSON.stringify(slots, null, 2));
  res.json({ message: "Slot booked successfully" });
});

module.exports = router;
