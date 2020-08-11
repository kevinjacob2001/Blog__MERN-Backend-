import express from 'express';

const app = express();

app.get('/hello', (req, res) => res.send('Hello!'));

app.listen(8050, () => console.log('Listening on port 8000'));