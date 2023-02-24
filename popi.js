const d = require('./config/mongoConnection')
const projects = require('./config/mongoCollections')
async function main(){
    
const db = await d.dbConnection()
await db.dropDatabase();
const projectcollection = await projects()

const ob = {
    name:"yash",
    customer:"xyz",
    description:"yoyo",
    address:"lakjsdfhkas",
    status:"asdkfjashdlfkja"
}
const insertInfo = await projectcollection.insertOne(ob);
}
main()