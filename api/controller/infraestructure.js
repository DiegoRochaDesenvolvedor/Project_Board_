const Structure = require('../model/Data.js');

class infraestructure{
        constructor(data,table,title){
            this.data = data;
            this.table = table;
            this.title = title;
        }

        createTable(){
            return Structure.writeData(this.data,this.table);
        }
        readTable(){
            return Structure.readData(this.table);
        }
        addData(){
           return Structure.form()
        }
        
    }
module.exports = infraestructure
