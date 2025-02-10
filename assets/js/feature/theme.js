export const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    document.getElementById("theme").checked = theme === "dark";
  };
  
  export const initTheme = () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  
    document.querySelector("#theme").addEventListener("change", () => {
      const theme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(theme);
      localStorage.setItem("theme", theme);
    });
  };  