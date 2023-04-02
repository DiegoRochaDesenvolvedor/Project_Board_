const infra = require('../model/Data.js');

class DataManipulate{
    constructor(text,completed,state,table,date,message,input_sprint,sprint_menu_color,organization){
        this.text = text,
        this.completed = completed,
        this.state = state,
        this.table = table,
        this.date = date || null,
        this.message = message,
        this.input_sprint = input_sprint || '',
        this.sprint_menu_color =  sprint_menu_color || 'Grey',
        this.organization = organization
    }
    form (){
        const form =[{
            "id":1,
            "table":this.table,
            "text":this.text,
            "completed":this.completed,
            "expirationDate": this.date,
            "status":this.state,
            "message":1,
            "sprint_text":this.input_sprint,
            "sprint_color":this.sprint_menu_color,
            "organization":this.organization
        }]
        return form
    }
    writeData(){
        infra.addData(this.form(),this.table);
    }
    editData(id,text = null,completed = null,status = null,message = null){
        const tableData = infra.readData(this.table)
        const id_data = id
        const item = tableData[id_data]

        item.id = id+1
        if(text != null){
            item.text = text;
        };
        if(completed != null){
            item.completed = completed;
        };
        if(status != null){
            item.status = status;
        };
        if(message != null){
            item.message = message
        }     
 
        tableData.splice(id_data,1,item);
        infra.writeData(tableData, this.table);
    }
    deleteData(id){
    }
}

module.exports = DataManipulate;