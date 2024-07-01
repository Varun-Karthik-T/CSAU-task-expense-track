
const expenseService = require('../services/expenseService');

async function addExpense(req, res) {
    try {
        const expense = await expenseService.addExpense(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function editExpense(req, res){
    try {
        const expense = await expenseService.editExpense(req.params.id, req.body);
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function removeExpense (req, res) {
    try {
        await expenseService.removeExpense(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function getAllExpenses (req, res) {
    try {
        const expenses = await expenseService.getAllExpenses();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

async function getExpensesByCategory  (req, res)  {
    try {
        const expenses = await expenseService.getExpensesByCategory(req.params.category);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

 async function getExpensesByMonthYear  (req, res) {
    try {
        const { month, year } = req.params;
        const expenses = await expenseService.getExpensesByMonthYear(month, year);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addExpense,
    editExpense,
    removeExpense,
    getAllExpenses,
    getExpensesByCategory,
    getExpensesByMonthYear,
};
