import express from 'express';
import bodyParser from 'body-parser';
const app = express();

const articleInfo = {
    "learn-react": {
        upvotes: 0,
        comments:[]
    },
    "learn-node": {
        upvotes: 0,
        comments:[]
    },
    "my-thoughts-on-resumes": {
        upvotes: 0,
        comments:[]
    }
}


app.use(bodyParser.json())

app.post("/api/articles/:name/upvote",(req,res)=>{
    const articleName=req.params.name;
    articleInfo[articleName].upvotes+=1;
    res.status(200).send(`${articleName} now has ${articleInfo[articleName].upvotes} upvotes`)
})

app.post("/api/articles/:name/add-comment",(req,res)=>{
    
})

app.listen(8050, () => console.log('Listening on port 8050!'));