const fs = require('fs');

const writeData = (data,table)=>{
    const dataConverted = JSON.stringify(data,null,'\t');
    ///resources/app/
    fs.writeFile(`./db/${table}.json`,dataConverted ,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Dados cadastrados')
        }
    });
}
const addData = (data,table)=>{

    let readTable = readData (table);

    if(readTable == null){
        readTable = data;
        readTable.id = 1
    }else{
        const dataFilter = data.shift();
        console.log(dataFilter)
        dataFilter.id = readTable.length+1
        readTable.push(dataFilter) 
    }///resources/app
        fs.writeFile(`./db/${table}.json`,JSON.stringify(readTable,null,'\t'),(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log('Dados cadastrados')
            }
        });
    //reloadWindow();
}
const readData = (table)=>{
    ///resources/app
    const read = fs.readFileSync(`./db/${table}.json`,'utf-8');
    return JSON.parse(read);
}
const reloadWindow = ()=>{
    document.location.reload(true);
}
const deleteData = (id,tableName)=>{
    const table = readData (tableName);
    const idTable = id;
    const tabela = table.filter(item => item.id != idTable);
    for(let i = 0; i<tabela.length; i++){
        tabela[i].id = i+1;
    };
    writeData(tabela,tableName);
    reloadWindow();
}
const readTables = ()=>{
    ////resources/app
   const data = fs.readdirSync('./db',(err,data)=>{
        if(err){
            return err;
        }
        return data
    })
    return data
};
const filterData = (date)=>{
    return date
};
module.exports = {
    writeData,
    readData,
    addData,
    deleteData,
    readTables,
    filterData
}