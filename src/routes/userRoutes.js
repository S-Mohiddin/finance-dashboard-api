const express = require('express');
const { body } = require('express-validator');
const { getUsers, updateUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validate');

const router = express.Router();

// All routes require authentication and Admin role
router.use(protect);
router.use(authorize('Admin'));

router.route('/')
  .get(getUsers);

router.route('/:id')
  .put(
    [
      body('role').optional().isIn(['Viewer', 'Analyst', 'Admin']).withMessage('Invalid role'),
      body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status'),
      validateRequest
    ],
    updateUser
  );

module.exports = router;
