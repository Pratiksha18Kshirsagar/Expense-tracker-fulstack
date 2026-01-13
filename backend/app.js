const express = require('express');
const cors = require('cors');
const app = express();
const seqelize = require('./utils/db');
const port = 3000;
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

seqelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to start server:', err);
});
