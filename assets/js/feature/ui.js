import { fetchLanguages } from "../config/api.js";

export const renderRepo = async (repo) => {
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

export const showError = (container) => {
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
};

// Reveal Animation
export const reveal = () => {
  const windowHeight = window.innerHeight;
  document.querySelectorAll(".revealToTheRight, .revealToTheLeft").forEach(el => {
    el.classList.toggle("active", el.getBoundingClientRect().top < windowHeight - 150);
  });
};

// Up To Scroll
const upBtn = document.getElementById("up");
const toggleVisibility = () => {
  if (!upBtn) return;
  const isVisible = document.documentElement.scrollTop > 50;
  Object.assign(upBtn.style, { 
    visibility: isVisible ? "visible" : "hidden", 
    opacity: isVisible ? 1 : 0 
  });
};

const handleScroll = () => requestAnimationFrame(toggleVisibility);

if (upBtn) {
  upBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

["scroll", "resize"].forEach(event => window.addEventListener(event, () => {
  reveal();
  handleScroll();
}));