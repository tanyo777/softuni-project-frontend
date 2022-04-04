const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(__dirname + '/dist/softuni-frontend'));

app.get('/*', function(req,res) {
 
res.sendFile(path.join(__dirname+'/dist/softuni-frontend/index.html'));
});

app.listen(4200);