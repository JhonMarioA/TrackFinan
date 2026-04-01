const paymentMethodRepo = require('../repositories/paymentMethod.repository');


const createMethod = async (userId, name) => {
    return await paymentMethodRepo.createMethod(userId, name);
};


const getMethodsByUserId = async (userId) => {
    return await paymentMethodRepo.getMethodsByUserId(userId);
};


const updateMethod = async (userId, id, name) => {
    const method = await paymentMethodRepo.getMethodById(id);

    if (!method) { throw new Error("Payment method not found"); }

    // console.log(method.user_id, userId);

    if (method.user_id !== userId) { throw new Error("Unauthorized"); }

    await paymentMethodRepo.updateMethod(id, name);
};


const deleteMethod = async (userId, id) => {
    const method = await paymentMethodRepo.getMethodById(id);

    if (!method) { throw new Error("Payment method not found"); }

    if (method.user_id !== userId) { throw new Error("Unauthorized"); }

    await paymentMethodRepo.deleteMethod(id);
};


module.exports = {
    createMethod,
    getMethodsByUserId,
    updateMethod,
    deleteMethod
};