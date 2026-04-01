const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {

    try{
        const userId = req.user.userId;
        const { name, transaction_type_id } = req.body;

        const id = await categoryService.createCategory(userId, name, transaction_type_id);
        res.status(201).json({ id });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getCategories = async (req, res) => {

    try{
        const userId = req.user.userId;
        const categories = await categoryService.getCategories(userId);
        res.json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const { name} = req.body;
        // console.log(userId);

        await categoryService.updateCategory(userId, id, name);

        res.json({ message: 'Category updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const deleteCategory = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        await categoryService.deleteCategory(userId, id);
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};