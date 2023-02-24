const d = require('../../config/mongoConnection');
const projects = require('../../config/mongoCollections')
async function main(){
    alert("sonaksjdf")
    const db = await d.dbConnection();
    const projectcollection = await projects()
    let projectslist = await projectcollection.find({}).toArray();
    logInfo("This is my info message");
    return projectslist
}
main()