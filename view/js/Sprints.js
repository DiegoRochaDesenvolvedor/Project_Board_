// const infraestructure = require('../../api/controller/infraestructure.js');
// const DataManipulate = require('../../api/controller/DataManipulate.js');
// const Structure = require('../../api/model/Data.js');

const readTable = () =>{
        // const data = new infraestructure(null,tableRead);
        // const readData = data.readTable();
        fetch('http://localhost:3000/readDataconfig')
        .then(res => res.json())
        .then((res)=>{
                const tableName = res[0].tableRead

        let data = { "table" : tableName}
        console.log(data)
        fetch('http://localhost:3000/tableReadData',{
            method:"POST",
            body: JSON.stringify(data),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        })/////////////////////POST
        .then( res => res.json()
        )
        .then((res)=>{    
            const readData = res
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
                        const div_text = document.createElement('div');
                        const div_sprint = document.createElement('div');
                   
                        const br = document.createElement('br');
                        const button_ok = document.createElement('button');
                        const delete_button = document.createElement('button');
                        //add text
                       // div.innerHTML = readData[i].expirationDate;
    
                        //td.innerHTML = readData[i].text;
                        div_text.innerHTML = readData[i].text
                        div_sprint.innerHTML = readData[i].sprint_text
                        delete_button.innerHTML = 'x'; // add dados
                        button_ok.innerHTML = 'OK';
                        button_ok.id = readData[i].id;
                        delete_button.id = readData[i].id;
                        //add class
                        td.classList = 'line';
                        button_ok.classList = 'ok_button';
                        delete_button.classList = 'delete_button';
                        div.classList = 'date';
                        div_sprint.classList = readData[i].sprint_color;
                        console.log(readData[i].sprint_color)
    
                        //create tags
                        table.appendChild(tr);
                        tr.appendChild(td);
                        tr.appendChild(br);
                        td.appendChild(div_sprint);
                        td.appendChild(div_text);
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
                        const text = document.createElement('div');
                        const tag = document.createElement('div');
                        //add text
                        //td.innerHTML = readData[i].text;
                        button_back.innerHTML = 'x';
                        button_back.id = readData[i].id;
                        tag.innerHTML = readData[i].sprint_text;
                        text.innerHTML = readData[i].text;
                        //add class
                        td.classList = 'line';
                        button_back.classList = 'back_button';
                        tag.classList = readData[i].sprint_color;
                        //create tags
                        table_complete.appendChild(tr);
                        tr.appendChild(td);
                        td.appendChild(tag);
                        td.appendChild(text);
                        td.appendChild(button_back);    
                    }
                
                 };
            }
        })
    })
            //     // .catch(err=> console.log(err))
}
;
const insertInput = (data,table,date,sprint,sprint_color) =>{
    const inputData = new DataManipulate(data,0,'todo',table,date,1,sprint,sprint_color);
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
readTable();
// module.exports = {
//     readTable,
//     insertInput,
//     loopButton,
//     setBackTodo,
//     loopButtonBack,
//     loopButtonDelete   
// }

