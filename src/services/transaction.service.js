const transactionRepo = require('../repositories/transaction.repository');
const accountRepo = require('../repositories/account.repository');
const categoryRepo = require('../repositories/category.repository');
const paymentMethodRepo = require('../repositories/paymentMethod.repository');


const createTransaction = async (userId, data) => {

    const { account_id, category_id, payment_method_id, amount, description } = data;

    // validate account
    const account = await accountRepo.getAccountById(account_id);
    if (!account) throw new Error("Account not found");
     // console.log(account.user_id, userId);
    if (account.user_id !== userId) throw new Error("Unauthorized account");

    // validate category
    const category = await categoryRepo.getCategoryById(category_id);
    if (!category) throw new Error("Category not found");
    
    if (category.user_id !== null && category.user_id !== userId){
        throw new Error("Unauthorized category");
    }

    // validate payment method
    const method = await paymentMethodRepo.getMethodById(payment_method_id);
    if (!method) throw new Error("Payment method not found");
    if (method.user_id !== userId) throw new Error("Unauthorized payment method")

    return await transactionRepo.createTransaction(
        account_id,
        category_id,
        payment_method_id,
        amount,
        description
    );

};

const getTransactions = async (userId) => {
    return await transactionRepo.findTransactionsByUserId(userId);
};


const updateTransaction = async (userId, transactionId, data) => {
    const transaction = await transactionRepo.findTransactionById(transactionId);
    if (!transaction) throw new Error("Transaction not found");

    // validate ownership
    const account = await accountRepo.getAccountById(transaction.account_id);
    if(account.user_id !== userId) throw new Error("Unauthorized");

    const { account_id, category_id, payment_method_id, amount, description } = data;

    // validate new account
    const newAccount = await accountRepo.getAccountById(account_id);
    if (!newAccount) throw new Error("Account not found");
    if (newAccount.user_id !== userId) throw new Error("Unauthorized account");

    // validate category
    const category = await categoryRepo.getCategoryById(category_id);
    if (!category) throw new Error("Category not found");
    
    if (category.user_id !== null && category.user_id !== userId){
        throw new Error("Unauthorized category");
    }

    // validate payment method
    const method = await paymentMethodRepo.getMethodById(payment_method_id);
    if (!method) throw new Error("Payment method not found");
    if (method.user_id !== userId) throw new Error("Unauthorized payment method")

    return await transactionRepo.updateTransaction(
        transactionId,
        account_id,
        category_id,
        payment_method_id,
        amount,
        description
     );
};


const deleteTransaction = async (userId, transactionId) => {
    const transaction = await transactionRepo.findTransactionById(transactionId);
    if (!transaction) throw new Error("Transaction not found");

    // validate ownership
    const account = await accountRepo.getAccountById(transaction.account_id);
    if(account.user_id !== userId) throw new Error("Unauthorized");

    return await transactionRepo.deleteTransaction(transactionId);
};

const findWithFilters = async (userId, filters) => {
    return await transactionRepo.findWithFilters(userId, filters);
};

module.exports = {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    findWithFilters
};