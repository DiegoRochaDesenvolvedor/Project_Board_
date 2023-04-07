const DataUser = require('../model/DataUser.js');

class User {
    constructor(user,password,group,profile){
        this.user = user,
        this.password = password,
        this.group = group,
        this.profile = profile
    }
    setUserProfile(staff){
        const profile = null;
        if(staff = "administrator"){
            profile = 1
        }else{
            profile = 2
        }
        return profile
    }
    addUser(){
        const data = new DataUser(this.user,this.password,this.group,this.profile);
        data.editData(); 
    }
    createToken(){
        const number = Math.floor(Math.random() * (7000 - 1000)+1000);
        const token = number;
        console.log(token);
        ///////Criar o insert


    }
    validateSession(){} 
}

const data = new User("Fulano2","pass","Grupo 3",1);
data.createToken();

// const token = Math.floor(Math.random() * (7000 - 1000)+1000);
// console.log(token);