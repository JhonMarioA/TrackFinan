const express = require('express');
const app = express();

const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');
const categoryRoutes = require('./routes/category.routes');
const paymentMethodRoutes = require('./routes/paymentMethod.routes');
const transactionRoutes = require('./routes/transaction.routes');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/payment-methods', paymentMethodRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to TrackFinan API");
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});