var express = require('express');
var app = express();
app.use("/borad-class-service", require('./RestControllers/BoardClassController'));
app.listen(3001);
console.log("Listening at http://localhost:3001");