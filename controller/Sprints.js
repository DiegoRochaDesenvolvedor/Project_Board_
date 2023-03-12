const infraestructure = require('../controller/infraestructure.js');
const DataManipulate = require('./DataManipulate.js');
const Structure = require('../model/Structure.js');

const readTable = (tableRead) =>{
        const data = new infraestructure(null,tableRead);
        const readData = data.readTable();
        const table = document.querySelector('table.todo_table');
        const table_complete = document.querySelector('table.completed_table')

        if(readData==null){
            return
        }else{
            for(let i = 0 ; i<readData.length ; i++){
                if(readData[i].completed === 0){ // if status not complete
                    const tr = document.createElement('tr');
                    const td = document.createElement('td');
                    const div = document.createElement('div');
                    const br = document.createElement('br');
                    const button_ok = document.createElement('button');
                    const delete_button = document.createElement('button');
                    //add text
                   // div.innerHTML = readData[i].expirationDate;

                    td.innerHTML = readData[i].text;
                    delete_button.innerHTML = 'x'; // add dados
                    button_ok.innerHTML = 'OK';
                    button_ok.id = readData[i].id;
                    delete_button.id = readData[i].id;
                    //add class
                    td.classList = 'line';
                    button_ok.classList = 'ok_button';
                    delete_button.classList = 'delete_button';
                    div.classList = 'date';
                    //create tags
                    table.appendChild(tr);
                    tr.appendChild(td);
                    tr.appendChild(br);
                    td.appendChild(button_ok);
                    td.appendChild(delete_button);       
                    if(readData[i].expirationDate != null){
                        div.innerHTML = Structure.filterData(readData[i].expirationDate);
                        td.appendChild(div);
                    }
                }else{
                    //create completed list
                    const tr = document.createElement('tr');
                    const td = document.createElement('td');
                    const button_back = document.createElement('button');
                    //add text
                    td.innerHTML = readData[i].text;
                    button_back.innerHTML = 'x';
                    button_back.id = readData[i].id;
                    //add class
                    td.classList = 'line';
                    button_back.classList = 'back_button';
                    //create tags
                    table_complete.appendChild(tr);
                    tr.appendChild(td);
                    td.appendChild(button_back);    
                }
            
             };
        }
        
};
const insertInput = (data,table,date) =>{
    const inputData = new DataManipulate(data,0,'todo',table,date);
    inputData.writeData();

};
const loopButton = (tableName)=>{
    const button_ok = document.querySelectorAll('.ok_button');
    
    for(let i = 0;i<button_ok.length;i++){
        button_ok[i].onclick = function(){
            setCompleted(this.id,tableName);
        };//taking position butoon in array
    }
};
const loopButtonBack = (tableName)=>{
    const back_button = document.querySelectorAll('.back_button');
    
    for(let i = 0;i<back_button.length;i++){
        back_button[i].onclick = function(){
            setBackTodo(this.id,tableName);
        };//taking position butoon in array
    }
};
const setCompleted = (id,tableName) =>{
    const completed = 1;
    const position = id-1;
    const table = tableName; // alter this data to dinamize the function
    const data = new infraestructure(table,table);
    const readData = data.readTable();
    
    readData[position].completed = completed;
    Structure.writeData(readData,table);
    document.location.reload(true);
};
const setBackTodo = (id,tableName) =>{
    const completed = 0;
    const position = id-1;
    const table = tableName; // alter this data to dinamize the function
    const data = new infraestructure(tableName,tableName);
    const readData = data.readTable();
    
    readData[position].completed = completed;
    Structure.writeData(readData,table);
    document.location.reload(true);
};
const loopButtonDelete = (tableName) =>{
    const button_delete = document.querySelectorAll('.delete_button');
    const table = tableName;
    for(let i = 0;i<button_delete.length;i++){
        button_delete[i].onclick = function(){
            Structure.deleteData(this.id,table);
        };//taking position butoon in array
    }
};

module.exports = {
    readTable,
    insertInput,
    loopButton,
    setBackTodo,
    loopButtonBack,
    loopButtonDelete   
}