const express = require('express');
const cors = require('cors');
const app = express();
const seqelize = require('./utils/db');
const port = 4000;
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
require('./models/index');

const path = require("path");
app.use("/frontend", express.static(path.join(__dirname, "../frontend")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/payment', paymentRoutes);



seqelize.sync({alter:true}).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to start server:', err);
});
