// services/expenseService.js
const Expense = require('../models/expenseModel');

async function addExpense(data) {
    const expense = new Expense(data);
    return expense.save();
};

async function editExpense(id, data){
    return Expense.findByIdAndUpdate(id, data, { new: true });
};

async function removeExpense(id){
    return Expense.findByIdAndDelete(id);
};

async function getAllExpenses(){
    return Expense.find();
};

async function getExpensesByCategory(category){
    return Expense.find({ category });
};

async function getExpensesByMonthYear(month, year){
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);
    return Expense.find({ date: { $gte: start, $lte: end } });
};

module.exports = {
    addExpense,
    editExpense,
    removeExpense,
    getAllExpenses,
    getExpensesByCategory,
    getExpensesByMonthYear,
};
