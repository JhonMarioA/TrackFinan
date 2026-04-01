const paytmentMethodService = require('../services/paymentMethod.service');

const createMethod = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name } = req.body;

        const methodId = await paytmentMethodService.createMethod(userId, name);

        res.status(201).json({ id: methodId, name });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMethods = async (req, res) => {
    try {
        const userId = req.user.userId;

        const methods = await paytmentMethodService.getMethodsByUserId(userId);
        res.json(methods);
    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateMethod = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;
        const { name } = req.body;

        await paytmentMethodService.updateMethod(userId, id, name);
        res.json({ message: "Payment method updated" });
    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteMethod = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { id } = req.params;

        await paytmentMethodService.deleteMethod(userId, id);
        res.json({ message: "Payment method deleted" });
    
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    createMethod,
    getMethods,
    updateMethod,
    deleteMethod
};