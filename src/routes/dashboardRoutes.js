const express = require('express');
const { getSummary } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('Analyst', 'Admin'));

router.get('/', getSummary);
router.get('/summary', getSummary);

module.exports = router;
