//const Data = require('../../api/model/Data.js')
const readDashboard = async ()=>{
    await fetch('http://localhost:3000/tablesRead')
    .then(res => res.json())
    .then(async(res)=>{
        //const titles = res;
    //console.log(res)
    const titlesFilter = res.map(obj => obj.replace('.json',''))
    console.log(titlesFilter)
    for(let i = 0; i<titlesFilter.length; i++){
        const table = titlesFilter[i]
        let data = { "table" : table}
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
        const tableData = res
        const projects_table = document.querySelector('table.projects_table')
        for(let i = 0; i<tableData.length; i++){
            console.log(tableData[i])

            //const tr = document.createElement('tr')
            const tr = document.createElement('tr');
            const tr_sprint = document.createElement('tr')
            const td = document.createElement('td');
            const td_sprint = document.createElement('td');
            const div_numbers = document.createElement('div');
            const div_title = document.createElement('div');
            const div_todo = document.createElement('div');
            const div_complete = document.createElement('div')
            const br = document.createElement('br');
            const h1 = document.createElement('h1');
            const table = document.createElement('table');
            const span_text = document.createElement('span')
            const span = document.createElement('span')
            const sprint_due = document.createElement('span')
            const text_sprint = document.createElement('span')
            const span_todo_number = document.createElement('span')

            sprint_due.classList = 'sprint_due';
            text_sprint.classList = 'text_sprint';
            span_todo_number.classList = 'todo_number';
            tr_sprint.classList = 'sprint_line_background';
            td_sprint.classList = 'sprint-lines';
            div_numbers.classList = 'numbers_project';
            span_text.classList = 'sprint_text_line';
            div_title.classList = 'titleProject_dashboard'; 
            div_todo.classList = 'toDo_dashboard';
            div_complete.classList = 'toDo_dashboard';
            table.classList = 'projects_table';

            projects_table.appendChild(tr_sprint);
            projects_table.appendChild(tr_sprint);

        }
     })
    // } 
}})
    
}
readDashboard()