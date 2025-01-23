const express = require('express');
const app = express();
const authRoutes = require('./src/routes/authRoutes')

app.use(express());

app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});