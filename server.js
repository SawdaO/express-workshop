const express = require('express');
const app = express();
const formidable = require('express-formidable');
const fs = require('fs');

const readwrite = (blogpost) => {
    fs.readFile(__dirname + '/data/posts.json',(error, file) => {
        //console.log(file.toString());
        let parsedFile = JSON.parse(file);
        parsedFile[Date.now()] = blogpost; 
        fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedFile), (error)=> {
            if (error) throw error;
            console.log("This worked :)")
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


app.listen(3000, () => {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});



