import {dbConnection,closeConnection}from '../config/mongoConnection.js';
import projects from '../config/mongoCollections.js';

export default async function main(){
    const db = await dbConnection();
    const projectcollection = await projects()
    let projectslist = await projectcollection.find({}).toArray();
    return projectslist
}