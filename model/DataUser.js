const fs = require('fs');
module.exports = class DataUser{
    constructor(user,password,group,profile){
        this.user = user ;
        this.password = password;
        this.group = group;
        this.profile = profile;
    };
    form (){
        const form = [{
                "id":null,
                "user":this.user,
                "password":this.password,
                "token":null,
                "profile": this.profile,
                "group": this.group
        }]
        return form 
    }
    createUser(){
        this.insertData(form());
    }
    readTable(){
        const read = fs.readFileSync(`../config/user.json`,'utf-8');
        return JSON.parse(read);
    }
    editData(){
        const table = this.readTable();
        const data = this.form()[0]
        const lastElement = table[table.length - 1];
        data.id = lastElement.id+1
        table.push(data);
        this.insertData(table);

    }
    insertData(data){
        fs.writeFile(`../config/user.json`,JSON.stringify(data,null,'\t'),(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log('Dados cadastrados')
            }
        })  
    }
}
