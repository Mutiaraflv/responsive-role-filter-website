const roles = [
  { title: 'Product Designer', department: 'Design', location: 'Jakarta · Hybrid', type: 'Full-time', description: 'Merancang pengalaman digital yang terasa intuitif, inklusif, dan menyenangkan.' },
  { title: 'Brand Designer', department: 'Design', location: 'Jakarta · Hybrid', type: 'Full-time', description: 'Membentuk identitas visual yang membawa cerita RuangKarya ke dunia.' },
  { title: 'Frontend Engineer', department: 'Engineering', location: 'Remote · Indonesia', type: 'Full-time', description: 'Membangun antarmuka web yang cepat, mudah diakses, dan terasa istimewa.' },
  { title: 'Backend Engineer', department: 'Engineering', location: 'Jakarta · Hybrid', type: 'Full-time', description: 'Merancang sistem andal yang membantu produk kami tumbuh dengan sehat.' },
  { title: 'Content Strategist', department: 'Marketing', location: 'Jakarta · Hybrid', type: 'Full-time', description: 'Mengubah insight dan ide menjadi cerita yang berguna bagi banyak orang.' },
  { title: 'Community Associate', department: 'People', location: 'Jakarta · On-site', type: 'Full-time', description: 'Menciptakan pengalaman kerja yang hangat dan mendukung setiap orang.' },
  { title: 'Talent Partner', department: 'People', location: 'Remote · Indonesia', type: 'Contract', description: 'Menemukan rekan baru yang akan tumbuh dan berkarya bersama tim.' },
  { title: 'Data Analyst', department: 'Operations', location: 'Jakarta · Hybrid', type: 'Full-time', description: 'Membantu tim mengambil keputusan yang lebih baik lewat data.' }
];

const filter = document.querySelector('#department-filter');
const grid = document.querySelector('#role-grid');
const empty = document.querySelector('#empty-state');
const count = document.querySelector('#result-count');
const departments = [...new Set([...roles.map((role) => role.department), 'Finance'])];

departments.forEach((department) => {
  const option = document.createElement('option');
  option.value = department;
  option.textContent = department;
  filter.append(option);
});

function renderRoles() {
  const selected = filter.value;
  const matchingRoles = selected === 'all' ? roles : roles.filter((role) => role.department === selected);
  grid.replaceChildren();
  matchingRoles.forEach((role) => {
    const card = document.createElement('article');
    card.className = 'role-card';
    card.innerHTML = `<div class="card-top"><span class="department-tag">${role.department}</span><span class="card-arrow" aria-hidden="true">↗</span></div><h3>${role.title}</h3><p>${role.description}</p><div class="card-meta"><span>${role.location}</span><span>${role.type}</span></div>`;
    grid.append(card);
  });
  const hasResults = matchingRoles.length > 0;
  grid.hidden = !hasResults;
  empty.hidden = hasResults;
  count.textContent = `${matchingRoles.length} posisi terbuka`;
}

filter.addEventListener('change', renderRoles);
document.querySelector('#reset-filter').addEventListener('click', () => {
  filter.value = 'all';
  renderRoles();
  filter.focus();
});
renderRoles();
