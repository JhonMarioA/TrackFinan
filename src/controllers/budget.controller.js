const budgetService = require('../services/budget.service');

const createBudget = async (req, res) => {
    try {
        const userId = req.user.userId;
        const budgetId = await budgetService.createBudget(userId, req.body);
        res.status(201).json({ id: budgetId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getBudgets = async (req, res) => {
    try {
        const data = await budgetService.getBudgetsByUserId(req.user.userId);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateBudget = async (req, res) => {
    try {
        const budgetId = req.params.id;
        const { amount } = req.body;
        await budgetService.updateBudget(budgetId, amount);
        res.json({ message: "Budget updated successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteBudget = async (req, res) => {
    try {
        const budgetId = req.params.id;
        await budgetService.deleteBudget(budgetId);
        res.json({ message: "Budget deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getBudgetStatus = async (req, res) => {
    try {
        const userId = req.user.userId;
        const data = await budgetService.getBudgetStatus(userId);
        res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }   
};

module.exports = {
    createBudget,
    getBudgets,
    updateBudget,
    deleteBudget,
    getBudgetStatus
};