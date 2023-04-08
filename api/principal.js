const express = require('express');
const fs = require('fs');
const Data = require('./model/Data.js');
const infraestructure = require('./controller/infraestructure.js');
const app = express();

app.use(express.json());
//////////////Projects
//Ok
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
//Ok  
app.get('/tablesRead', (req, res) => {
    const table = Data.readTables();
    res.json(table)
})
//OK
app.post('/tableReadData',(req,res)=>{

    const table = {"table":req.body.table};
    const filter = Data.readData(table.table)
    res.send(filter);
})
//////////////TEM LAÇO A FUNÇAO 
app.post('/DataConfig', function (req, res) {
    const tableRead = {
        'tableRead': req.body.tableRead
    }
    // const read = Data.readTables()
    // const table = read[i].replace('.json', '');
    const tableArray = [];

    tableArray.push(tableRead);

    fs.writeFile(`./api/config/Data_config.json`, JSON.stringify(tableArray), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Dados cadastrados')
        }
    });
})
//OK
app.post('/deleteTable', (req, res) => {
    const tableDelete = {
        tableDelete: req.body.tableDelete
    }
    const path = `./api/db/${tableDelete.tableDelete}.json`;
    fs.unlinkSync(path);
    res.end('tabela excluida');
});
//OK
app.post('/addTable', (req, res) => {
    const text = {
        textInput: req.body.textInput
    }

    const data = new infraestructure(null, text.textInput);
    data.createTable();
    res.status(200).send(text);
});
// verificar funçao
app.post('/addTableKey', () => {
    const data = new infraestructure(null, input_text.value);
    data.createTable();
    document.location.reload(true);
})

//-----------POST
//////////////Sprints
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
