fetch('http://localhost:6969/projects')
.then((response) => response.json())
.then((data) => {
    console.log(data)
    const projectContainer = document.getElementById("project-container")
    for (let project of data){
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
    }
});

