const express = require('express');
const {generateFile} = require('./generateFile');
const {executeCpp} = require('./executeCpp');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// /run -> POST
app.post('/run', async (req, res) => {
    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: 'Code not found' });
    }
    try{
        const filepath = generateFile(language, code);
        const output = await executeCpp(filepath);
        return res.json({ output });
    } catch (error) {
        res.status(500).json({ error: error});
    }
    
});

const PORT = 4000;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Eror while running the server!",error);
    } else {
        console.log(`Server is running on port: ${PORT}`);
    }
});