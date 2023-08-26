const express = require('express');
const path = require('node:path');
const fs = require('node:fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

let adviceList = fs.readFileSync(path.resolve(__dirname, 'data.json'), 'utf-8');
adviceList = JSON.parse(adviceList);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// hello world
app.get('/api', (req, res) => {
    return res.status(200).json({
        message: 'hello World'
    })
});

// hello world with name
app.post('/api', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            message: 'Name is required'
        })
    }

    return res.status(200).json({
        message: `Welcome ${name}`
    })
});

// return a list of advices
app.get('/api/advices', (req, res) => {
    return res.status(200).json({
        adviceList
    })
});

// get random advice
app.get('/api/advices/random', (req, res) => {
    const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];

    return res.status(200).json({
        randomAdvice
    })
});

// return a single advice
app.get('/api/advices/:id', (req, res) => {
    const { id } = req.params;
    const advice = adviceList.find((advice) => advice.id == id);

    if (!advice) {
        return res.status(404).json({
            message: `Advice not found - ${id}`
        })
    };

    return res.status(200).json({
        advice
    })
});

// create a new advice
app.post('/api/advices', (req, res) => {
    const { str } = req.body;

    if (!str) {
        return res.status(400).json({
            message: 'str is required'
        })
    }

    const id = adviceList.length + 1;
    const newAdvice = {
        id,
        str
    };

    adviceList.push(newAdvice);
    fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(adviceList));

    return res.status(200).json({
        adviceList
    })
});

// 404 page not found
app.use('*', (req, res) => {
    return res.status(404).json({
        message: 'Page not found'
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
