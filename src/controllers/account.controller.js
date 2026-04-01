const accountService = require('../services/account.service');

const createAccount = async (req, res) => {

    try{
        const userId = req.user.userId;
        const { type_id, name } = req.body;

        const id = await accountService.createAccount(userId, type_id, name);

        res.status(201).json({ id });
    } catch(err){
        res.status(400).json({ error: err.message})
    };
};

const getAccounts = async (req, res) => {

    try{
        const userId = req.user.userId;
        const accounts = await accountService.getAccounts(userId);

        res.json(accounts);
    } catch(err) {
        res.status(400).json({ error: err.message});
    }
};

const updateAccount = async (req, res) => {

    try{
        const userId = req.user.userId;
        const {id} = req.params;
        const {name} = req.body;
            
        await accountService.updateAccount(userId, id, name);

        res.json({message: "Account updated"});

    } catch(err){
        res.status(400).json({error: err.message})
    }
};

const deleteAccount = async (req, res) => {

    try{
        const userId = req.user.userId;
        const {id} = req.params;

        await accountService.deleteAccount(userId, id);
        res.json({message: "Account deleted"});

    } catch(err){
        res.status(400).json({error: err.message})
    }
};

const getAccountTypes = async (req, res) => {

    try{
        const types = await accountService.getAccountTypes();
        res.json(types);
    } catch(err){
        res.status(400).json({error: err.message})
    } 
};

const getTransactionTypes = async (req, res) => {
    try{
        const types = await accountService.getTransactionTypes();
        res.json(types);
    } catch(err){
        res.status(400).json({error: err.message})
    }
};


module.exports = {
    createAccount,
    getAccounts,
    updateAccount,
    deleteAccount,
    getAccountTypes,
    getTransactionTypes
};