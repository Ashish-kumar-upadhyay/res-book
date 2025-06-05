const express = require('express');
const router = express.Router();
const Resident = require('../models/Resident');


router.get('/', async (req, res) => {
  try {
    const residents = await Resident.find().sort({ createdAt: -1 });
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const resident = new Resident({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    title: req.body.title,
    profilePhoto: req.body.profilePhoto,
    linkedinUrl: req.body.linkedinUrl,
    twitterUrl: req.body.twitterUrl,
  });

  try {
    const newResident = await resident.save();
    res.status(201).json(newResident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 