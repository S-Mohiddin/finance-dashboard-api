const Record = require('../models/Record');
const catchAsync = require('../utils/catchAsync');
const { successResponse } = require('../utils/apiResponse');

// @desc    Get dashboard summary
// @route   GET /api/v1/dashboard/summary
// @access  Private (Analyst, Admin)
exports.getSummary = catchAsync(async (req, res, next) => {
  // Aggregate total income and expenses
  const totals = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' }
      }
    }
  ]);

  let totalIncome = 0;
  let totalExpenses = 0;

  totals.forEach(t => {
    if (t._id === 'income') totalIncome = t.total;
    if (t._id === 'expense') totalExpenses = t.total;
  });

  const netBalance = totalIncome - totalExpenses;

  // Category-wise breakdown
  const categoryBreakdown = await Record.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: { type: '$type', category: '$category' },
        totalAmount: { $sum: '$amount' }
      }
    },
    { $sort: { totalAmount: -1 } }
  ]);

  // Monthly trends (last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthlyTrends = await Record.aggregate([
    { $match: { isDeleted: false, date: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          month: { $month: '$date' },
          year: { $year: '$date' },
          type: '$type'
        },
        totalAmount: { $sum: '$amount' }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  // Recent 5 transactions
  const recentTransactions = await Record.find({ isDeleted: false })
    .sort({ date: -1 })
    .limit(5)
    .populate('createdBy', 'name email');

  successResponse(res, 200, 'Dashboard summary retrieved successfully', {
    overview: {
      totalIncome,
      totalExpenses,
      netBalance
    },
    categoryBreakdown: categoryBreakdown.map(c => ({
      type: c._id.type,
      category: c._id.category,
      amount: c.totalAmount
    })),
    monthlyTrends: monthlyTrends.map(m => ({
      year: m._id.year,
      month: m._id.month,
      type: m._id.type,
      amount: m.totalAmount
    })),
    recentTransactions
  });
});
