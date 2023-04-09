const express = require('express');
const fs = require('fs');
const Data = require('./model/Data.js');
const infraestructure = require('./controller/infraestructure.js');
const app = express();

app.use(express.json());

app.use((req,res,next)=>{
    // setHeader
    res.header("Access-Control-Allow-Origin","*")
    res.header("Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE")
    res.header("Access-Control-Allow-Headers","Content-Type")
    next();
})
app.get('/projectRead', function (req, res) {
    const read = fs.readFileSync(`./api/config/Data_config.json`, 'utf-8');
    return res.send(JSON.parse(read));
})
app.get('/tablesRead', (req, res) => {
    const table = Data.readTables();
    res.json(table)
})
app.post('/tableReadData',(req,res)=>{
    const table = {"table":req.body.table};
    // const filter = Data.readData(table.table)
    const read = fs.readFileSync(`./api/db/${table.table}.json`,'utf-8');
    JSON.parse(read);
    res.send(read);
})
app.post('/DataConfig', function (req, res) {
    const tableRead = {
        'tableRead': req.body.tableRead
    }
    const tableArray = [];
    tableArray.push(tableRead);
    fs.writeFile(`./api/config/Data_config.json`, JSON.stringify(tableArray), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Dados cadastrados')
        }
    });
    //JSON.parse(read);
    res.send(tableRead);
})
app.get('/readDataconfig',(req,res)=>{
    const read = fs.readFileSync(`./api/config/Data_config.json`,'utf-8');
    res.send(JSON.parse(read));
    res.status(200)
})
app.post('/deleteTable', (req, res) => {
    const deleteTable = {
        deleteTable: req.body.deleteTable
    }
    const path = `./api/db/${deleteTable.deleteTable}.json`;
    fs.unlinkSync(path);
    res.status(200).send(console.log(deleteTable));
});
app.post('/addTable', (req, res) => {
    const text = {
        textInput: req.body.textInput
    }

    const data = new infraestructure(null, text.textInput);
    data.createTable();
    res.status(200).send(text);
});
app.post('/addTableKey', () => {
    const data = new infraestructure(null, input_text.value);
    data.createTable();
    document.location.reload(true);
})
app.post('/filterTable', (req, res) => {
    const table = {
        "table": req.body.table
    }
    const filter = Data.readData(table.table)
    //res.send(table.table);
    const data = new infraestructure(null, table.table);//adicionar nome da tabela dinamico
    const readData = data.readTable();
    res.send(readData);
})
app.listen(3000, () => {
    console.log('Servidor funcionando');
})
