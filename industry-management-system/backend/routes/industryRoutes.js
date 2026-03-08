const express = require('express');
const router = express.Router();
const industryController = require('../controllers/industryController');
const authController = require('../controllers/authController');

// Apply authentication middleware to all industry routes
router.use(authController.authenticateToken);

// Industry routes
router.get('/', industryController.getAllIndustries);
router.get('/:id', industryController.getIndustryById);
router.post('/', industryController.createIndustry);
router.put('/:id', industryController.updateIndustry);
router.delete('/:id', industryController.deleteIndustry);

module.exports = router;