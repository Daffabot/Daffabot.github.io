import { fetchRepos } from "./config/api.js";
import { renderRepo, showError, reveal } from "./feature/ui.js";
import { initTheme } from "./feature/theme.js";
import { registerServiceWorker } from "./feature/sw-register.js";
import { articleComments, loadDisqus } from "./feature/comments.js";

const init = async () => {
  const container = document.querySelector(".primary-content");
  const element = document.getElementById("onload");
  const loader = document.getElementById("loader");

  try {
    const cachedData = JSON.parse(localStorage.getItem("githubRepos"));
    const repos = cachedData || await fetchRepos();
    const filteredRepos = repos.filter(({ topics }) => topics?.includes("my"));

    if (!cachedData) localStorage.setItem("githubRepos", JSON.stringify(filteredRepos));

    const repoElements = await Promise.all(filteredRepos.map(renderRepo));
    container.innerHTML = repoElements.join("").concat(articleComments);
    element?.classList.remove("onload");
    loader?.classList.remove("loader");

    document.querySelectorAll("article").forEach((el, i) =>
      el.classList.add(["revealToTheLeft", "revealToTheRight"][i % 2])
    );

    const openBtn = document.getElementById("loadDisqus");
    if (openBtn) openBtn.addEventListener('click', loadDisqus);

    reveal();
  } catch (error) {
    showError(container);
    reveal();
    console.error(error);
  }
};

(window.location.pathname === "/" || window.location.pathname === "/index.html") ? init() : reveal();
initTheme();
registerServiceWorker();