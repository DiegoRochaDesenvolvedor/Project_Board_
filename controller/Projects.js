const readTable = require('../model/Structure.js');
const infraestructure = require('../controller/infraestructure.js')
const Structure = require('../model/Structure.js');
const DataManipulate = require('../controller/DataManipulate.js')
const fs = require('fs')

const button_add = document.querySelector('.button_add');
const input_text = document.querySelector('.input_text');

const readTables = () =>{
    const table = document.querySelector('table.projects_table');
    const read = readTable.readTables()
    const filter = read.map(item=>item.replace('.json',''));
    for(let i = 0 ; i<read.length ; i++){
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            const button_text = document.createElement('button');
            const button = document.createElement('button');
            //add text
           
            button_text.id = i;
            button_text.innerHTML = filter[i];
            button.innerHTML = 'X';
            //add class
            button_text.classList = 'button_text';
            button.classList = 'button_delete';
            //create tags
            table.appendChild(tr);
            tr.appendChild(td);
            td.appendChild(button_text);
            td.appendChild(button);
            
        }
}

const readMessages = ()=>{
    
    const banner = document.querySelector('div.date_message');
    const datesMessage = readAllDates();
    const filterData = datesMessage.filter(item => item.message==1)

    for(let i = 0 ; i<filterData.length; i++){

                const div = document.createElement('div');
                const button_close = document.createElement('div');
                const title_date = document.createElement('div');
                const dateDate = document.createElement('div');
                
                button_close.innerHTML = 'X';
                button_close.id = filterData[i].id;
                title_date.innerHTML = `Sprint: ${filterData[i].text}`;
                dateDate.innerHTML = `Due in: ${filterData[i].expirationDate}`;
    
                div.classList = 'date_message_banner';
                button_close.classList = 'button_close';
                title_date.classList = 'title_date';
                dateDate.classList = 'dateDate';
    
                banner.appendChild(div);
                div.appendChild(button_close);
                div.appendChild(title_date);
                div.appendChild(dateDate);
            
                setMessage(i,filterData[i].id,filterData[i].table)
      
            }
            
}
const setMessage = (id_message,id,table)=>{
        const button_close_message = document.querySelectorAll('.button_close');
        button_close_message[id_message].onclick = function (){
            const message = 0;
            const data_id = id-1; 
            const data = new DataManipulate(null,null,null,table,null,null);
            data.editData(data_id,null,null,null,message);
            document.location.reload(true);
        }       
};
const readAllDates = () =>{
    const table_titles = Structure.readTables();
    const tables = table_titles.map(data => data.replace('.json',''))
    const dates = [];
    
    const date = new Date();
    const dayAdjusted = ('0'+ (date.getDate()+4)).slice(-2);
    const mounth = ('0'+ date.getMonth()+1).slice(-2);
    const year = date.getFullYear();
    const dateCorrect = `${year}-${mounth}-${dayAdjusted}`;

    console.log(dateCorrect);

        for(let i = 0; i<tables.length;i++){
            const data = Structure.readData(tables[i]);
            if(data == 0 || data == null){    
            }else{
               for(let i = 0; i<data.length; i++){
                    if(data[i].expirationDate == dateCorrect){
                        dates.push(data[i]);
                    }
                }
            }
    };
    return dates
}
const delete_button = (table)=>{
    const read = readTable.readTables()
    const filter = read.map(item=>item.replace('.json',''));

    const table_delete = document.querySelectorAll('.button_delete');

    for(let i = 0; i<table_delete.length;i++){
        table_delete[i].onclick = function (){
            delete_table(filter[i]);
        }
    };
};    
const buttonTable = ()=>{
    const table_button = document.querySelectorAll('.button_text');

    for(let i = 0; i<table_button.length;i++){
        table_button[i].onclick = function (){
            setTable(this.id);

        }
    }
};
const setTable = (i) =>{
    const read = readTable.readTables();
    const table = read[i].replace('.json','');

    const tableRead ={
        'tableRead': table
    }

    const tableArray = [];
    tableArray.push(tableRead);
//resources/app
    fs.writeFile(`./config/Data_config.json`,JSON.stringify(tableArray) ,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Dados cadastrados')
        }
    });

    window.location.href="project.html";
}
//./resources/app
const delete_table = (tableName) =>{
    const path = `./db/${tableName}.json`;
    fs.unlinkSync(path);
    document.location.reload(true);
};
const addTable = ()=>{
    const data = new infraestructure(null,input_text.value);
    data.createTable();
    document.location.reload(true);
};
const addTableKey = (input_text)=>{
    const data = new infraestructure(null,input_text.value);
    data.createTable();
    document.location.reload(true);
};
document.addEventListener('keydown',(e)=>{
    const key = e.key;  
    if(key == 'Enter'){
        addTableKey(input_text);
    }
});
button_add.onclick =  addTable;

readTables();
readMessages();
buttonTable();
delete_button();
// buttonMessage();
//DeleteTable
