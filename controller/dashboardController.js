const Data = require('../model/Data.js');

class DashboardController {
    readProjects(){
       const tables =  Data.readTables();
       const filter = tables.map( obj => obj.replace('.json',''));
       return filter;
    }
    readSprints(table){
        const sprints = Data.readData(table);
        return sprints       
    }
    dashboarNumberSprints(option){
    const arrayProjects = this.readProjects();
    const Data = this.readSprints(arrayProjects[0])
    const filter = Data.filter(obj => obj.status === option);
    return filter.length
    }
    dashboarStatusSprints(option, table){
        const Data = this.readSprints(table);
        const statusData = Data.filter(obj => obj.status === option);
        return statusData
    }
    
}
module.exports = DashboardController;
