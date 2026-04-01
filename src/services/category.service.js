const categoryRepo = require('../repositories/category.repository');

const createCategory = async (userId, name, transactionTypeId) => {

    return await categoryRepo.createCategory(userId, name, transactionTypeId);
};

const getCategories = async (userId) => {

    return await categoryRepo.getCategories(userId);
};

const updateCategory = async (userId, categoryId, name) => {

    const category = await categoryRepo.getCategoryById(categoryId);
    
    if(!category) { throw new Error("Category not found"); }

    if(category.user_id === null) { throw new Error("Cannot update global category"); }

    if(category.user_id !== userId) { throw new Error("Unauthorized"); }

    await categoryRepo.updateCategory(categoryId, name);    
};

const deleteCategory = async (userId, categoryId) => {

    const category = await categoryRepo.getCategoryById(categoryId);

    if(!category) { throw new Error("Category not found"); }

    if(category.user_id === null) { throw new Error("Cannot delete global category"); }

    if(category.user_id !== userId) { throw new Error("Unauthorized"); }

    await categoryRepo.deleteCategory(categoryId);    
};

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
}