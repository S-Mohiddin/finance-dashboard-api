const express = require('express');
const { body, query } = require('express-validator');
const {
  getRecords,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord
} = require('../controllers/recordController');
const { protect, authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validate');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(
    [
      query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
      query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
      query('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
      validateRequest
    ],
    getRecords
  )
  .post(
    authorize('Admin'),
    [
      body('amount', 'Amount is required and must be a number').isNumeric(),
      body('type', 'Type must be income or expense').isIn(['income', 'expense']),
      body('category', 'Category is required').notEmpty(),
      validateRequest
    ],
    createRecord
  );

router.route('/:id')
  .get(getRecord)
  .put(
    authorize('Admin'),
    [
      body('amount').optional().isNumeric(),
      body('type').optional().isIn(['income', 'expense']),
      validateRequest
    ],
    updateRecord
  )
  .delete(authorize('Admin'), deleteRecord);

module.exports = router;
