const db = require("../config/db")

const createAccount = async (userId, typeId, name) =>{

    const [result] = await db.execute(
        `INSER INTO account (user_id, type_id, name) VALUES (?, ?, ?)`,
        [userId, typeId, name]
    );
    return result.insertId;
};


const getAccountsByUser = async (userId) => {

    const [rows] = await db.execute(
        `SELECT * FROM account WHERE id=?`,
        [userId]
    );
    return rows;
};


const getAccountById = async (id) => {

    const [rows] = await db.execute(
        `SELECT * FROM account WHERE id=?`,
        [id]
    );
    return rows[0];
};

const updateAccount = async (id, name) => {

    await db.execute(
        `UPDATE account SET name=? WHERE id=?`,
        [name, id]
    );
};

const deleteAccount = async (id) => {

    await db.execute(
        `DELETE FROM account WHERE id=?`,
        [id]
    );
}


module.exports = {
    createAccount,
    getAccountsByUser,  
    getAccountById,
    updateAccount,
    deleteAccount
};
