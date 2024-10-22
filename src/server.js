import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

const app = express();


app.use(express.static(path.join(__dirname,'/build')));
app.use(bodyParser.json());


app.get('/api/articles/:name', async (req, res) => {
    try {
        const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');
    
        const articleInfo = await db.collection('articles').findOne({ name: articleName })
        res.status(200).json(articleInfo);
    
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
    
})

app.post('/api/articles/:name/upvote', async (req, res) => {
    try {
        const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');
    
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {upvotes: articleInfo.upvotes + 1}});
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticleInfo);
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
});

app.post('/api/articles/:name/add-comment',async (req, res) => {
    try{
        const { username, text } = req.body;
        const articleName = req.params.name;
    
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection("articles").updateOne({name:articleName},{
            "$set":{comments:articleInfo.comments.concat({username,text})}
        })
        const updatedArticleInfo=await db.collection("articles").findOne({name:articleName})
        res.status(200).json(updatedArticleInfo);
        client.close();
    }
    catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
    
});




    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname+"/build/index.html"))
    })



app.listen(8050, () => console.log('Listening on port 8050'));