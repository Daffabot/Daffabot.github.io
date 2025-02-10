import TOKEN from "./config/config.js";

(async () => {
  const container = document.querySelector(".primary-content");
  const element = document.getElementById("onload");
  const token = TOKEN ? TOKEN : null;
  const headers = { Authorization: `Bearer ${token}` };
  
  const fetchRepos = async () => {
    const response = await fetch("https://api.github.com/users/Daffabot/repos", { headers });
    if (!response.ok) throw new Error("Failed to fetch repositories");
    return response.json();
  };

  const fetchLanguages = async (repo) => {
    const response = await fetch(`https://api.github.com/repos/Daffabot/${repo.name}/languages`, { headers });
    if (!response.ok) return "Not specified";
    const languageData = await response.json();
    return Object.keys(languageData).join(", ") || "Not specified";
  };

  const renderRepo = async (repo) => {
    const languages = await fetchLanguages(repo);
    const repoImage = `https://opengraph.githubassets.com/1/Daffabot/${repo.name}`;
    
    return `
      <article>
        <a href="${repo.homepage || repo.html_url}" target="_blank">
          <img src="${repoImage}" alt="${repo.name} image">
        </a>
        <h2><a href="${repo.homepage || repo.html_url}" target="_blank">${repo.name}</a></h2>
        <p>${repo.description || "No description provided."}</p>
        <p class="tech-stack">Languages: ${languages}</p>
        <p class="stars">⭐ Stars: ${repo.stargazers_count}</p>
      </article>`;
  };

  try {
    const cachedData = JSON.parse(localStorage.getItem("githubRepos"));
    const repos = cachedData || await fetchRepos();
    const filteredRepos = repos.filter(({ topics }) => topics?.includes("my"));

    if (!cachedData) localStorage.setItem("githubRepos", JSON.stringify(filteredRepos));

    const repoElements = await Promise.all(filteredRepos.map(renderRepo));
    container.innerHTML = repoElements.join("");
    element?.classList.remove("onload");
    document.querySelectorAll("article").forEach((el, i) => el.classList.add(["revealToTheLeft", "revealToTheRight"][i % 2]));
    reveal();
  } catch (error) {
    console.error("Error fetching repositories:", error);
    container.innerHTML = `
      <article>
        <a href="https://www.daffabot.my.id/megumi" target="_blank">
          <img src="./assets/img/article1.jpg" alt="Megumi">
          <h1>Chatbot Live2D Character - Megumi</h1>
          <p>Sebuah aplikasi chatbot berbasis AI dengan karakter Live2D yang responsif dan ekspresif.</p>
        </a>
      </article>
      <article>
        <a href="https://www.daffabot.my.id/tank-super" target="_blank">
          <img src="./assets/img/article2.jpg" alt="Tank Super">
          <h1>Tank Super</h1>
          <p>Game HTML5 berbasis Construct 3 dengan mekanik Drag & Drop untuk pertempuran tank.</p>
        </a>
      </article>`;
  }
})();

// Reveal Annimation
function reveal() {
  const windowHeight = window.innerHeight;
  document.querySelectorAll(".revealToTheRight, .revealToTheLeft").forEach(el => {
    el.classList.toggle("active", el.getBoundingClientRect().top < windowHeight - 150);
  });
};

window.addEventListener("scroll", reveal);

// Theme Switching
const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  document.getElementById("theme").checked = theme === "dark";
};

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

document.querySelector("#theme").addEventListener("change", () => {
  const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(theme);
  localStorage.setItem("theme", theme);
});