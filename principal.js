const functions = require('../controller/principal')
const button_add = document.querySelector('button.add_button');
const input = document.querySelector('input.text_add');
const input_date = document.querySelector('.input_date')
const button_back = document.querySelector('.back');
const fs = require('fs');

const title = () =>{
    const title = document.querySelector('.titleTag');

    title.innerHTML = table()[0].tableRead;
};
const table = ()=>{
    const read = fs.readFileSync(`./resources/app/config/Data_config.json`,'utf-8');
    return JSON.parse(read);
}; 
const inputInsert = ()=>{
    functions.insertInput(input.value,table()[0].tableRead,input_date.value);
};
const inputInsertKey = (input)=>{
    functions.insertInput(input.value,table()[0].tableRead,input_date.value);
};
const botao = ()=>{
    window.location.href = "index.html"
};


button_add.onclick = inputInsert; //add input data
button_back.onclick = botao;
document.addEventListener('keydown',(e)=>{
    const key = e.key;  
    if(key == 'Enter'){
        inputInsertKey(input);
    }
});
functions.readTable(table()[0].tableRead);//read list todo
functions.loopButton(table()[0].tableRead);//add ok buttons function action
functions.loopButtonBack(table()[0].tableRead);//add back buttons function action
functions.loopButtonDelete(table()[0].tableRead);
title();
