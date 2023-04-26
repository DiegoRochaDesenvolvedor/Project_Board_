const buttonReport = document.querySelector('button.report')
const buttonBack = document.querySelector('div.back')
const readDashboard = async ()=>{
    await fetch('http://localhost:3000/tablesRead')
    .then(res => res.json())
    .then(async(res)=>{
    const titlesFilter = res.map(obj => obj.replace('.json',''))
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
        console.log(tableData[0].table)
        const complete = res.filter(obj => obj.completed == 0)
        const toDo = res.filter(obj => obj.completed == 1)

        const completeCount =  complete.length
        const toDoCount = toDo.length
      
        //////////////
            const tr_sprint = document.createElement('tr')
            const div_numbers = document.createElement('div');
            const div_title = document.createElement('div');
            const div_todo = document.createElement('div');
            const div_complete = document.createElement('div')
            const br = document.createElement('br');
            const h1 = document.createElement('h1');
            const hh1 = document.createElement('h1');
            const span_text = document.createElement('span')
            const span = document.createElement('span')
            const span_todo_number = document.createElement('span')
            const span_complete = document.createElement('span')
            const td_sprint = document.createElement('td');
            const tableSprint = document.createElement('table')

            tr_sprint.classList = 'sprint_line_background';
            td_sprint.classList = 'sprint_lines';
            span_todo_number.classList = 'todo_number';
            span_complete.classList = 'todo_number';
            div_numbers.classList = 'numbers_project';
            span_text.classList = 'sprint_text_line';
            div_title.classList = 'titleProject_dashboard'; 
            div_todo.classList = 'toDo_dashboard';
            div_complete.classList = 'toDo_dashboard';
            tableSprint.classList = 'projects_table';

            span_text.innerHTML = tableData[0].table;
            div_todo.innerHTML = 'To do';
            div_complete.innerHTML = 'Complete';
            h1.innerHTML = completeCount;
            span_complete.innerHTMl = toDoCount;
            span.innerHTML = tableData[0].expirationDate;
            hh1.innerHTML = toDoCount;

            projects_table.appendChild(tr_sprint);
            tr_sprint.appendChild(td_sprint);
            td_sprint.appendChild(div_numbers);
            
            div_numbers.appendChild(div_title);
            div_title.appendChild(span_text)
            div_title.appendChild(span)
            
            div_numbers.appendChild(div_todo);
            div_todo.appendChild(h1);
            div_todo.appendChild(span_todo_number);
            
            div_numbers.appendChild(div_complete);
            div_complete.appendChild(hh1);
            div_complete.appendChild(span_complete);
            
            td_sprint.appendChild(tableSprint)

            
        //     /////////////// loop
        for(let i = 0; i<complete.length; i++){

            const table = document.createElement('table');
            const tr = document.createElement('tr');
            const tr_sprint = document.createElement('tr')
            const td = document.createElement('td');
            const td_sprint = document.createElement('td');
            const sprint_due = document.createElement('span')
            const text_sprint = document.createElement('span')
            
            table.classList = 'projects_table';
            tr_sprint.classList = 'sprint_line_background';
            td_sprint.classList = 'sprint-lines';
            sprint_due.classList = 'sprint_due';
            text_sprint.classList = 'text_sprint';

            if(tableData[i].expirationDate != null){
                sprint_due.innerHTML = ` Due in: ${complete[i].expirationDate}`;
            }
            text_sprint.innerHTML = complete[i].text;

            tableSprint.appendChild(tr);
            tr.appendChild(td);
            td.appendChild(text_sprint)
            td.appendChild(sprint_due)
        }
     })
    // } 
}})
    
}
const report = () =>{
    console.log('funciona')
    window.print();
}
const backButton =()=>{
    ///console.log();
    window.location.href="../index.html"
}
readDashboard()

buttonReport.onclick = report
buttonBack.onclick = backButton