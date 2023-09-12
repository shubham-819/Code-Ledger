const express = require('express');
const {getRows,addOrUpdateRow,deleteRow} = require('./Dynamo')
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/user', async (req, res) => {
    const id = req.body.userid;
    try {
        const character = await getRows(id);
        res.json(character);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Can\'t get questions and snippets.' });
    }
});

app.post('/user', async (req, res) => {
    const character = req.body;
    try {
        const newCharacter = await addOrUpdateRow(character);
        res.json(newCharacter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Can\'t add question/snippet.' });
    }
});

app.put('/user', async (req, res) => {
    const character = req.body;
    try {
        const newCharacter = await addOrUpdateRow(character);
        res.json(newCharacter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Can\'t update question/snippet.' });
    }
});

app.delete('/user', async (req, res) => {
    const userid = req.body.userid;
    const typeid = req.body.typeid;
    try {
        res.json(await deleteRow(userid,typeid));
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Can\'t delete question/snippet' });
    }
});


app.listen(port,()=>{
    console.log('Server running at ' + port);
});
