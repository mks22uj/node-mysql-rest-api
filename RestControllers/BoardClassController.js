var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodedb"
});
con.connect(function (err) {
    if (err) throw err;
    //console.log("Connection Established Successfully");
});
var responseMessage = (results) => {
    return {
        "error": false,
        "errorCode": null,
        "message": null,
        "response": results
    };
};
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
router.post('/add_board_class', (req, res) => {
    var jsonData = JSON.parse(JSON.stringify(req.body));
    console.log(jsonData);
    con.query("insert into board_class set ?", jsonData, function (error, result) {
        if (error) throw error;
        res.send(result);
    });
});
router.get('/getAllBoard_class', (req, res) => {
    con.query("select * from board_class", function (err, results, fields) {
        if (err) throw err;
        res.send({
            error: false,
            message: null,
            response: results
        });
    });
});
router.get('/get_board_class/:id', (req, res) => {
    console.log(req.body);
    var sql = "select * from board_class where id=" + req.params.id;
    con.query(sql, function (err, results, fields) {
        if (err) throw err;
        res.send(responseMessage(results));
    });
});
router.delete('/delete_board_class/:id', (req, res) => {
    var sql = "delete from board_class where id=" + req.params.id;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send({
            error: false,
            message: null,
            errorCode: false,
            response: result
        });
    });
});
router.patch('/updateAll', (req, res) => {
    var jsonData = JSON.parse(JSON.stringify(req.body));
    con.query("update board_class set ? where id=" + jsonData.id, jsonData, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
router.patch('/update_Pareticular_board_class', (req, res) => {
    var jsonData = JSON.parse(JSON.stringify(req.body));
    con.query('update board_class set class_name=? where id=?', [jsonData.class_name, jsonData.id], (err, result) => {
        if (err) throw err;
        res.send({
            error: false,
            message: null,
            errorCode: false,
            response: result
        });
    });
});
module.exports = router;