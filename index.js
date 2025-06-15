// Sidebar Toggle Functionality
const sidebar = document.getElementById("sidebar");
const closeBtn = document.getElementById("closeBtn");
const closeDiv = document.getElementById("close");
const barsBtn = document.getElementById("bars");

closeBtn.addEventListener("click", () => {
 closeDiv.style.display = "none";
 sidebar.style.width = "0px";
});

barsBtn.addEventListener("click", () => {
 closeDiv.style.display = "flex";
 sidebar.style.width = "70%";
});

// Utility: Fetch and Parse JSON
async function getDataFromJSON(filePath) {
 try {
  const response = await fetch(filePath);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return await response.json();
 } catch (error) {
  console.error("Fetch error:", error);
  throw error;
 }
}

// Populate Services Section
function appendServicesList(data) {
 const servicesListContainer = document.getElementById("ServicesList");
 if (!servicesListContainer) return;

 data.forEach(service => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("card");

  // Header
  const header = document.createElement("div");
  header.classList.add("card-header");

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-gears";

  const title = document.createElement("p");
  title.textContent = service.title;

  header.appendChild(icon);
  header.appendChild(title);

  // Description
  const descriptionContainer = document.createElement("div");
  const list = document.createElement("ol");

  service.description.forEach(desc => {
   const li = document.createElement("li");
   li.textContent = desc;
   list.appendChild(li);
  });

  descriptionContainer.appendChild(list);

  // Assemble card
  wrapper.appendChild(header);
  wrapper.appendChild(descriptionContainer);
  servicesListContainer.appendChild(wrapper);
 });
}

// Populate Projects Section
function appendProjectsList(data) {
 const projectListContainer = document.getElementById("ProjectsList");
 if (!projectListContainer) return;

 data.forEach(project => {
  const card = document.createElement("div");
  card.classList.add("card");

  const techStackHTML = (project.teck_stack || []).map(stack => `
      <div class="stack-category">
        <strong>${stack.cat_name}:</strong> ${stack.skills.join(", ")}
      </div>
    `).join("");

  card.innerHTML = `
      <div class="card-header">
        <h3>${project.title}</h3>
      </div>
      <p>${project.description}</p>
      <a href="${project.url}" target="_blank">View Project</a>
      <div class="tech-stack">${techStackHTML}</div>
    `;

  projectListContainer.appendChild(card);
 });
}

// Update Footer Copyright
function updateCopyRight() {
 const currentYear = new Date().getFullYear();
 const siteTitle = document.title || "My Website";
 const copyright = document.getElementById("copyright");
 if (copyright) copyright.innerHTML = `&copy; ${currentYear} - ${siteTitle}`;
}

// Init
(async () => {
 try {
  const [servicesList, projectList] = await Promise.all([
   getDataFromJSON("./services.json"),
   getDataFromJSON("./projects.json")
  ]);
  appendServicesList(servicesList);
  appendProjectsList(projectList);
 } catch (err) {
  console.error("Error loading data:", err);
 }
 updateCopyRight();
})();