const budgetRepo = require('../repositories/budget.repository');
const categoryRepo = require('../repositories/category.repository');

const createBudget = async (userId, data) => {
    const { category_id, amount, month, year } = data;

    if (amount <= 0) throw new Error("Amount must be greater than zero");

    const category = await categoryRepo.getCategoryById(category_id);
    if (!category) throw new Error("Category not found");

    if (category.user_id !== null && category.user_id !== userId) {
        throw new Error("Unauthorized category");
    }

    return await budgetRepo.createBudget(userId, category_id, amount, month, year);
};


const getBudgetsByUserId = async (userId) => {
    return await budgetRepo.getBudgetsByUserId(userId);
};

const updateBudget = async (userId, budgetId, amount) => {

    const budget = await budgetRepo.getBudgetById(budgetId);
    if (!budget) throw new Error("Budget not found");
    if (budget.user_id !== userId) throw new Error("Unauthorized");
    if (amount <= 0) throw new Error("Amount must be greater than zero");

    await budgetRepo.updateBudget(budgetId, amount);
};

const deleteBudget = async (userId, budgetId) => {
    const budget = await budgetRepo.getBudgetById(budgetId);

    if (!budget) throw new Error("Budget not found");
    if (budget.user_id !== userId) throw new Error("Unauthorized");

    await budgetRepo.deleteBudget(budgetId);
};

const getBudgetStatus = async (userId) => {
    return await budgetRepo.getBudgetStatus(userId);
};

module.exports = {
    createBudget,
    getBudgetsByUserId,
    updateBudget,
    deleteBudget,
    getBudgetStatus
};