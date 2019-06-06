const express = require('express');
const app = express();
const formidable = require('express-formidable');
const fs = require('fs'); 

const readwrite = (blogpost) => {
    fs.readFile(__dirname + '/data/posts.json',(error, file) => {
        //console.log(file.toString());
        let parsedFile = JSON.parse(file);
        const d = new Date();
        parsedFile[d] = blogpost; //assigning written stuff to as a new property of the date and time now to the JSON
        fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedFile), (error)=> {
            if (error) throw error;
            console.log("This worked :) - this should be in the file")
        });
    });
};

app.use(express.static("public"));
app.use(formidable());

app.post('/create-post', (req, res)=> {
    //console.log('/create-post');
    //console.log(req.fields);
    readwrite(req.fields.blogpost);
});

app.get('/get-posts',(req,res)=>{
    console.log("Say another thing :)");
        res.sendFile(__dirname + '/data/posts.json')
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});



