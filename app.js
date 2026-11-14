const roles = [
  { title: "Product Designer", department: "Design", location: "Jakarta · Hybrid", type: "Full-time", description: "Merancang pengalaman digital yang intuitif dan mudah digunakan." },
  { title: "Brand Designer", department: "Design", location: "Jakarta · Hybrid", type: "Full-time", description: "Mengembangkan identitas visual dan cerita brand RuangKarya." },
  { title: "Frontend Engineer", department: "Engineering", location: "Remote · Indonesia", type: "Full-time", description: "Membangun antarmuka web yang cepat, responsif, dan mudah diakses." },
  { title: "Backend Engineer", department: "Engineering", location: "Jakarta · Hybrid", type: "Full-time", description: "Mengembangkan layanan dan sistem yang mendukung produk kami." },
  { title: "Content Strategist", department: "Marketing", location: "Jakarta · Hybrid", type: "Full-time", description: "Menyusun konten yang relevan untuk komunitas dan pelanggan." },
  { title: "People Associate", department: "People", location: "Jakarta · On-site", type: "Full-time", description: "Mendukung pengalaman kerja dan pertumbuhan anggota tim." }
];

const elements = {
  filter: document.querySelector("#department-filter"),
  grid: document.querySelector("#role-grid"),
  emptyState: document.querySelector("#empty-state"),
  resultCount: document.querySelector("#result-count"),
  resetButton: document.querySelector("#reset-filter")
};

const departments = [...new Set(roles.map(({ department }) => department))];
departments.push("Operations"); // Department ini digunakan untuk memperlihatkan empty state.

function populateDepartmentFilter() {
  departments.forEach((department) => {
    const option = document.createElement("option");
    option.value = department;
    option.textContent = department;
    elements.filter.append(option);
  });
}

function createRoleCard(role) {
  const card = document.createElement("article");
  card.className = "role-card";

  const heading = document.createElement("div");
  heading.className = "card-heading";

  const department = document.createElement("span");
  department.className = "department-tag";
  department.textContent = role.department;

  const arrow = document.createElement("span");
  arrow.className = "card-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  heading.append(department, arrow);

  const title = document.createElement("h2");
  title.textContent = role.title;

  const description = document.createElement("p");
  description.className = "role-description";
  description.textContent = role.description;

  const metadata = document.createElement("div");
  metadata.className = "card-meta";
  [role.location, role.type].forEach((value) => {
    const item = document.createElement("span");
    item.textContent = value;
    metadata.append(item);
  });

  card.append(heading, title, description, metadata);
  return card;
}

function renderRoles() {
  const selectedDepartment = elements.filter.value;
  const visibleRoles = selectedDepartment === "all"
    ? roles
    : roles.filter(({ department }) => department === selectedDepartment);

  elements.grid.replaceChildren(...visibleRoles.map(createRoleCard));
  elements.grid.hidden = visibleRoles.length === 0;
  elements.emptyState.hidden = visibleRoles.length > 0;
  elements.resultCount.textContent = `${visibleRoles.length} posisi tersedia`;
}

elements.filter.addEventListener("change", renderRoles);
elements.resetButton.addEventListener("click", () => {
  elements.filter.value = "all";
  renderRoles();
  elements.filter.focus();
});

populateDepartmentFilter();
renderRoles();
