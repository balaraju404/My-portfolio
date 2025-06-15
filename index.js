const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("closeBtn");
const closeDiv = document.getElementById("close");
const barsBtn = document.getElementById("bars");

closeBtn.addEventListener("click", function () {
 closeDiv.style.display = `none`
 sidebar.style.width = `0px`;
})

barsBtn.addEventListener("click", function () {
 closeDiv.style.display = `flex`
 sidebar.style.width = `70%`
})


async function getProjectList(filePath) {
 try {
  const response = await fetch(filePath)
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
  const data = await response.json()
  return data
 } catch (error) {
  console.error('Fetch error:', error)
  throw error
 }
}

(async () => {
 try {
  const projectList = await getProjectList('./projects.json')
  appendProjectsList(projectList)
 } catch (err) {
  console.error('Error loading project list:', err)
 }
})()

function appendProjectsList(data) {
 const projectListContainer = document.getElementById("ProjectsList");

 data.forEach((project) => {
  const card = document.createElement("div");
  card.classList.add("card")
  const techStackHTML = project.teck_stack.map(stack => `
      <div class="stack-category">
        <strong>${stack.cat_name}:</strong> ${stack.skills.join(', ')}
      </div>
    `).join('')

  card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.url}" target="_blank">View Project</a>
      <div class="tech-stack">
        ${techStackHTML}
      </div>
    `
  projectListContainer.appendChild(card);
 });
}


function updateCopyRight() {
 const currentYear = new Date().getFullYear()
 const siteTitle = document.title || "My Website"
 document.getElementById("copyright").innerHTML = `&copy; ${currentYear} - ${siteTitle}`
}
updateCopyRight()