import express from 'express';
import bodyParser from 'body-parser';
const app = express();

const articleInfo = {
    "learn-react": {
        upvotes: 0
    },
    "learn-node": {
        upvotes: 0
    },
    "my-thoughts-on-resumes": {
        upvotes: 0
    }
}


app.use(bodyParser.json())

app.get('/hello', (req, res) => res.send('Hello!'));
app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`))
app.post("/hello", (req, res) => res.send(`Hello my name is ${req.body.name}, I am ${req.body.age} yrs old`))




app.listen(8050, () => console.log('Listening on port 8050'));