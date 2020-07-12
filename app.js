const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

//CONNECTING MONGOOSE WITH MONGODB CLOUD(ATLAS)
const mongodb_uri = process.env.MONGODB_LINK;

mongoose.connect(mongodb_uri || 'mongodb://localhost/nuxt-mongodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () =>{
  console.log("Mongoose is connected!!!!")
});

//SCHEMA
const Schema = mongoose.Schema;
const BlogPostSchema =  new Schema({
    title: String,
    body: String,
    date: {
      type: String,
      default: Date.now()
    }
});

//MODEL
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

//SAVING DATA TO OUR DATABASE
const data = {
   title: "Where is my dog?",
   body: "Trying to understand why I don't have a dog. I love dogs."
}

const newBlogPost = new BlogPost(data); //instance of the model


newBlogPost.save((error) =>{
    if(error){
      console.log("Oops, something happened")
    }else{
      console.log("Data has been saved!!!")
    }
});

//.save()


//.find()
BlogPost.find(function (err, posts) {
  if (err) return console.error(err);
  console.log(posts);
})

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) =>{
    res.send('Hello world')
})

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log('Running on port 3000...')
})
