import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import projects from '../config/mongoCollections.js';

async function main(){
    const db = await dbConnection();
    const projectcollection = await projects()
    let projectslist = await projectcollection.find({}).toArray();
    return projectslist
}
export default await main()

