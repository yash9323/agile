const d = require('../../config/mongoConnection');
const projects = require('../../config/mongoCollections')
async function main(){
  const db = await d.dbConnection();
  const projectcollection = await projects()
  let projectslist = await projectcollection.find({}).toArray();
  console.log(projectslist)
  const projectContainer = document.getElementById("project-container");
  projectslist.forEach((project) => {
  const projectDiv = document.createElement("div");
  projectDiv.className = "project"
  projectDiv.innerHTML =
    `
    <div>
      <h2>${project.name}</h2>
      <p>Desc : ${project.description}</p>
      <p>address: ${project.address}</p>
      <p>customer: ${project.customer}</p>
    </div>
    <div>
      <h2>Status: ${project.status}</h2>
      <button type="button">Contact</button>
    </div>
    `;
  projectContainer.appendChild(projectDiv);
});
}

main()

