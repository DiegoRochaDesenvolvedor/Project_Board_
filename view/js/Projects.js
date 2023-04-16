const button_add = document.querySelector('.button_add');
const button_delete = document.querySelector('.button_delete')

const readTables = () =>{
    fetch('http://localhost:3000/tablesRead')
        .then(res => res.json())
        .then((res)=>{
    const read = res
    const table = document.querySelector('table.projects_table');
    const filter = read.map(item=>item.replace('.json',''));
    for(let i = 0 ; i<read.length ; i++){
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            const button_text = document.createElement('button');
            const button = document.createElement('button');
            //add text
           
            button_text.id = i;
            button.id = i;
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


    })}
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
                tag.innerHTML = filterData[i].sprint_text
    
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
const delete_button = ()=>{
    const table_delete = document.querySelectorAll('.button_delete');

    for(let i = 0; i<table_delete.length;i++){
        table_delete[i].onclick = function (){
            delete_table({"id":this.id});
            //console.log(this.id);
        }
    };
}
const buttonTable = ()=>{
    const table_button = document.querySelectorAll('.button_text');
    // console.log('Funciona')
    for(let i = 0; i<table_button.length;i++){
        table_button[i].onclick = function (){
            setTable(this.id);//////////
            console.log(this.id)
        }
    }
};
const setTable = async (i) =>{
    await fetch('http://localhost:3000/tablesRead')
    .then(res => res.json())
    .then(async(res)=>{
        console.log(res)
        const read = res
        const table = read[i].replace('.json','');
        console.log(table)
        let tableRead = { "tableRead" : table}
        await fetch('http://localhost:3000/DataConfig',{
                method:"POST",
                body: JSON.stringify(tableRead),
                headers:{
                        "Content-type":"application/json; charset=UTF-8"
                    }
                })/////////////////////POST
                .then( response => response.json()
                )
                .catch(err=> console.log(err))
    })
    window.location.reload()
    window.location.href="view/project.html";
}
const delete_table = (id) =>{
    fetch('http://localhost:3000/tablesRead')
        .then(res => res.json())
        .then((res)=>{
            const read = res
            const table = read[0].replace('.json','');
            let deleteTable = { "deleteTable" : table}
            fetch('http://localhost:3000/deleteTable',{
                method:"POST",
                body: JSON.stringify(deleteTable),
                headers:{
                        "Content-type":"application/json; charset=UTF-8"
                    }
                })
                .then( response => response
                )
                .catch(err=> console.log(err))
            })
    window.location.reload()
    window.location.href="index.html"
}
const addTable = async ()=>{
    const input_text = document.querySelector('input.input_text').value;
    let textInput = { "textInput" : input_text}
    // console.log(input_text)
    await fetch('http://localhost:3000/addTable',{
            method:"POST",
            body: JSON.stringify(textInput),
            headers:{
                    "Content-type":"application/json; charset=UTF-8"
                }
            })/////////////////////POST
            .then( response => response.json()
            .then(res => console.log(res))
            )
            .catch(err=> console.log(err))
            window.location.reload()
            window.location.href="index.html"
};
const reloadPage = ()=>{
     window.location.reload()
    window.location.href="view/project.html";   
}

document.addEventListener('keydown',(e)=>{
    const key = e.key;  
    if(key == 'Enter'){
        addTable();
    }
});
readTables();
button_add.onclick =  addTable;
document.querySelector('.buttonTable')
addEventListener("click",buttonTable,false)
document.querySelector('.buttonTable')
addEventListener("click",delete_button,false)
