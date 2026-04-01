const accountRepo = require("../repositories/account.repository");

const createAccount = async (userId, typeId, name) => {
    return await accountRepo.createAccount(userId, typeId, name);
};

const getAccounts = async (userId) => {
    return await accountRepo.getAccountsByUser(userId);
};

const updateAccount = async (userId, accountId, name) => {

    const account = await accountRepo.getAccountById(accountId);
    
    if(!account) throw new Error("Account not found");

    if(account.user_id !== userId) throw new Error("Unauthorized");

    await accountRepo.updateAccount(accountId, name);
};


const deleteAccount = async (userId, accountId) => {

    const account = await accountRepo.getAccountById(accountId);

    if(!account) throw new Error("Account not found");

    if(account.user_id !== userId) throw new Error("Unauthorized");

    await accountRepo.deleteAccount(accountId); 
};

const getAccountTypes = async () => {
    return await accountRepo.getAccountTypes();
};

const getTransactionTypes = async () => {
    return await accountRepo.getTransactionTypes();
};


module.exports = {
    createAccount,
    getAccounts,
    updateAccount,
    deleteAccount,
    getAccountTypes,
    getTransactionTypes
};