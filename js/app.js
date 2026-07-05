window.F1App = (() => {
  const MONTHS = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];

  const drivers = {};
  const teams = {};
  const driverTeamId = {};

  for (const team of window.F1_DATA.teams) {
    teams[team.id] = team;
    for (const d of team.drivers) {
      drivers[d.id] = d;
      driverTeamId[d.id] = team.id;
    }
  }

  let modal, panel, driverView, teamView;

  function formatDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
  }

  function calcAge(iso) {
    const born = new Date(iso);
    const now = new Date();
    let age = now.getFullYear() - born.getFullYear();
    const mo = now.getMonth() - born.getMonth();
    if (mo < 0 || (mo === 0 && now.getDate() < born.getDate())) age--;
    return age;
  }

  function titlesText(n) {
    if (n === 0) return "—";
    if (n === 1) return "1 title";
    return `${n} titles`;
  }

  function open() {
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function openDriver(id) {
    const d = drivers[id];
    if (!d) return;

    panel.style.setProperty("--pc", d.teamColor);
    driverView.hidden = false;
    teamView.hidden = true;

    document.getElementById("m-photo").src = d.photoLarge || d.photo;
    document.getElementById("m-photo").alt = d.fullName;
    document.getElementById("m-name").textContent = d.fullName;
    document.getElementById("m-number").textContent = d.number;
    document.getElementById("m-code").textContent = `#${d.number} · ${d.code}`;
    document.getElementById("m-team-logo").src = d.teamLogo;
    document.getElementById("m-team").textContent = d.teamName;
    document.getElementById("m-nationality").textContent = d.country || d.nationality;
    document.getElementById("m-dob").textContent = formatDate(d.dateOfBirth);
    document.getElementById("m-age").textContent = `${calcAge(d.dateOfBirth)} years old`;
    document.getElementById("m-debut").textContent = d.debut;
    document.getElementById("m-titles").textContent = titlesText(d.titles);
    document.getElementById("m-bio").textContent = d.bio || "";

    document.getElementById("m-team-row").dataset.teamId = driverTeamId[id];
    open();
  }

  function openTeam(id) {
    const t = teams[id];
    if (!t) return;

    panel.style.setProperty("--pc", t.color);
    driverView.hidden = true;
    teamView.hidden = false;

    document.getElementById("t-logo").src = t.logo;
    document.getElementById("t-logo").alt = t.name;
    document.getElementById("t-name").textContent = t.name;
    document.getElementById("t-fullname").textContent = t.fullName;
    document.getElementById("t-nationality").textContent = t.country;
    document.getElementById("t-base").textContent = t.base;
    document.getElementById("t-principal").textContent = t.principal;
    document.getElementById("t-engine").textContent = t.engine;
    document.getElementById("t-titles").textContent = titlesText(t.titles);
    document.getElementById("t-first").textContent = t.firstSeason;
    document.getElementById("t-color").textContent = t.color;
    document.getElementById("t-color-swatch").style.background = t.color;
    document.getElementById("t-driver-count").textContent = t.drivers.map(d => d.lastName).join(", ");
    document.getElementById("t-bio").textContent = t.bio || "";

    document.getElementById("t-roster").innerHTML = t.drivers.map(d => `
      <button class="roster-item" data-driver-id="${d.id}" type="button">
        <img src="${d.photoLarge || d.photo}" alt="${d.fullName}">
        <div class="roster-info">
          <span class="roster-name">${d.fullName}</span>
          <span class="roster-num">#${d.number} · ${d.code} · ${d.country || d.nationality}</span>
        </div>
      </button>
    `).join("");

    open();
  }

  function init() {
    modal = document.getElementById("modal");
    panel = document.getElementById("modal-panel");
    driverView = document.getElementById("modal-driver");
    teamView = document.getElementById("modal-team");

    document.getElementById("modal-close").addEventListener("click", close);
    document.getElementById("modal-backdrop").addEventListener("click", close);
    document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

    document.getElementById("t-roster").addEventListener("click", e => {
      const btn = e.target.closest("[data-driver-id]");
      if (btn) openDriver(btn.dataset.driverId);
    });

    document.getElementById("m-team-row").addEventListener("click", e => {
      const id = e.currentTarget.dataset.teamId;
      if (id) openTeam(id);
    });
  }

  return { init, openDriver, openTeam, close };
})();
