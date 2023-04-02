const dashboardController = require('./dashboardController.js');
const Data = require('../model/Data.js');

const constructLines = () =>{
    const entity = filtering()[0].entity;
    const entity_group = filtering()[0].group;
    console.log(entity)
    console.log(entity_group)
    
    const 
}

const filtering = ()=>{
    const filter = Data.readEntityConfig();
    return filter;
}
constructLines();