const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/', expenseController.addExpense);
router.put('/:id', expenseController.editExpense);
router.delete('/:id', expenseController.removeExpense);
router.get('/', expenseController.getAllExpenses);
router.get('/category/:category', expenseController.getExpensesByCategory);
router.get('/:month/:year', expenseController.getExpensesByMonthYear);

module.exports = router;
