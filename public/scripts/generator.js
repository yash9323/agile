const projectslist = [{
  name: "yash",
  customer: "xyz",
  description: "yoyo",
  address: "lakjsdfhkas",
  status: "asdkfjashdlfkja"
}]
try{
  const projectContainer = document.getElementById("project-container")
  for (let project of projectslist){
    alert("stop this shit1")
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
    alert(projectDiv.innerHTML)
    projectContainer.appendChild(projectDiv);
  }
}
catch(error){
  alert("stop this shit")
}



