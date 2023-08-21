const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('search');
})

app.get('/result', (req, res)=>{
   
    let query = req.query.search;

    request(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=41dfc476b8fc6a7290843af2419eec74`, (error, response, body)=>{
        if(error){
            console.log(error);
        }else{
            let data = JSON.parse(body);
            res.render('result', {data: data, querySearch: query});
        }  
    })
})


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started on port: ${port}`);
})