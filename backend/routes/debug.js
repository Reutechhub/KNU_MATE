const express = require('express');
const Material = require('../models/Material');

const router = express.Router();

// Return raw materials (for local debugging only)
router.get('/materials', async (req, res) => {
  try {
    const materials = await Material.find().lean();
    res.json({ count: materials.length, materials });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
