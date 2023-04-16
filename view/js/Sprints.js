// const infraestructure = require('../../api/controller/infraestructure.js');
//const Structure = require('../../api/model/Data.js');

const button_add = document.querySelector('button.add_button');
const input = document.querySelector('input.text_add');
const input_date = document.querySelector('.input_date');
const input_sprint = document.querySelector('input.text_sprint');
const input_color = document.querySelector('.sprint_menu_color');
const button_back = document.querySelector('.back');
const sprint_back = document.querySelector('.back_button')

const readTable = async () =>{
        // const data = new infraestructure(null,tableRead);
        // const readData = data.readTable();
        await fetch('http://localhost:3000/readDataconfig')
        .then(res => res.json())
        .then(async(res)=>{
                const tableName = res[0].tableRead

        let data = { "table" : tableName}
        console.log(data)
        await fetch('http://localhost:3000/tableReadData',{
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
                        const dateExpiration = document.createElement('div')
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
                        dateExpiration.innerHTML = readData[i].expirationDate
                        //add class
                        td.classList = 'line';
                        button_ok.classList = 'ok_button';
                        delete_button.classList = 'delete_button';
                        dateExpiration.classList = 'date';
                        div_sprint.classList = readData[i].sprint_color;
                        console.log(readData[i].sprint_color)
    
                        //create tags
                        table.appendChild(tr);
                        tr.appendChild(td);
                        tr.appendChild(br);
                        td.appendChild(div_sprint);
                        td.appendChild(div_text);
                        td.appendChild(dateExpiration)
                        td.appendChild(button_ok);
                        td.appendChild(delete_button);       
                        // if(readData[i].expirationDate != null){
                        //     div.innerHTML = Structure.filterData(readData[i].expirationDate);
                        //     td.appendChild(div);
                        // }
                    }else{
                        //create completed list
                        const tr = document.createElement('tr');
                        const td = document.createElement('td');
                        const button_back = document.createElement('button');
                        const text = document.createElement('div');
                        const tag = document.createElement('div');
                        const date = document.createElement('div')/////
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
        loopButton();
        sprintBack();
        delete_button();
    })
            //     // .catch(err=> console.log(err))
};
const insertInput = (data,table,date,sprint,sprint_color) =>{
    const inputData = new DataManipulate(data,0,'todo',table,date,1,sprint,sprint_color);
    inputData.writeData();
};
const loopButton = ()=>{
     fetch('http://localhost:3000/readDataconfig')
    .then(res=> res.json())
    .then((res)=>{
    const tableName = res        
        const button_ok = document.querySelectorAll('button.ok_button');
        for(let i = 0;i<button_ok.length;i++){
            button_ok[i].onclick = function(){
                //console.log('funciona!')
                setCompleted(this.id,tableName[0].tableRead);
            };//taking position butoon in array
        }
    })
};
const setCompleted = (id,tableName) =>{
let data = {
    "table": tableName,
    "id": id
}
     fetch('http://localhost:3000/setCompleted',{
    method:"POST",
    body: JSON.stringify(data),
    headers:{
        "Content-type":"application/json; charset=UTF-8"
    }
})/////////////////////POST
.then( res => res.json()
)
.then((res)=>{ 
    res.send(console.log('dados editados'))   
})
window.location.reload()
window.location.href="project.html";   
};
const setBackTodo = (id,tableName) =>{
    let data = {
        "table": tableName,
        "id": id
    }
         fetch('http://localhost:3000/setBackToDo',{
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    })/////////////////////POST
    .then( res => res.json()
    )
    .then((res)=>{ 
        res.send(console.log('dados editados'))   
    })
    window.location.reload()
    window.location.href="project.html";  
};
const sprintBack = () =>{
    fetch('http://localhost:3000/readDataconfig')
    .then(res=> res.json())
    .then((res)=>{
    const tableName = res   
    const sprint_back = document.querySelectorAll('.back_button')
        for(let i = 0;i<sprint_back.length;i++){
            sprint_back[i].onclick = function(){
                console.log('funciona!')
                setBackTodo(this.id,tableName[0].tableRead);
            };//taking position butoon in array
        }
    })
}
const sprintDelete = () =>{
    let data = {
        "table": tableName,
        "id": id
    }
         fetch('http://localhost:3000/setBackToDo',{
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    })/////////////////////POST
    .then( res => res.json()
    )
    .then((res)=>{ 
        res.send(console.log('dados editados'))   
    })
    window.location.reload()
    window.location.href="project.html";  
};
const inputInsert = async ()=>{
    const input = document.querySelector('input.text_add');
    const input_date = document.querySelector('.input_date');
    const input_sprint = document.querySelector('input.text_sprint');
    const input_color = document.querySelector('.sprint_menu_color');

    const addInput = {
        "text" : input.value,
        "table" : input_date.value,
        "date" : input_date.value,
        "input_sprint" : input_sprint.value,
        "sprint_menu_color" : input_color.value
    };
   await fetch('http://localhost:3000/readDataconfig')
        .then(res => res.json())
        .then(async (res)=>{
                const tableName = res[0].tableRead

                const addInput = {
                    "text" : input.value,
                    "table" : tableName,
                    "date" : input_date.value,
                    "input_sprint" : input_sprint.value,
                    "sprint_menu_color" : input_color.value
                }
        //console.log(data)
    await  fetch('http://localhost:3000/insertTableInput',{
            method:"POST",
            body: JSON.stringify(addInput),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        })/////////////////////POST
        .then( res => res.json()
        )
        .then((res)=>{
            console.log('dados cadastrados !')
        })
    })
    console.log(addInput)
    window.location.reload()

};
const back_button = ()=>{
    window.location.href="../index.html"
}
const delete_button = ()=>{
    fetch('http://localhost:3000/readDataconfig')
    .then(res=> res.json())
    .then((res)=>{
    const tableName = res   
    const button_delete = document.querySelectorAll('.delete_button');
    const table = tableName[0].tableRead;
    for(let i = 0;i<button_delete.length;i++){
    button_delete[i].onclick = function(){
        deleteSprint(this.id,table);
            console.log(this.id)
            console.log(table)
    };//taking position butoon in array
    }
})}
const deleteSprint =  (id,tableName)=>{
    let data = {
        "table": tableName,
        "id": id
    }
     fetch('http://localhost:3000/sprintDelete',{
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        }
    })/////////////////////POST
    .then( res => res.json()
    )
    .then((res)=>{ 
        res.send(console.log('dados editados'))   
    })
    window.location.reload()
    window.location.href="project.html";  
}
readTable();

button_add.onclick = inputInsert; //add input data
button_back.onclick = back_button;
document.addEventListener('keydown',(e)=>{
    const key = e.key;  
    if(key == 'Enter'){
        inputInsert();
    }
});

