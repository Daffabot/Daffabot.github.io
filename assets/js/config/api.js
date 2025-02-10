let TOKEN = null;

try {
  TOKEN = (await import("./config.js")).default;
} catch (error) {
  console.warn("config.js not found, proceeding without token.");
}

const token = TOKEN ? TOKEN.TOKEN : null;
const headers = token ? { Authorization: `Bearer ${token}` } : {};

export const fetchRepos = async () => {
  const response = await fetch("https://api.github.com/users/Daffabot/repos", { headers });
  if (!response.ok) throw new Error("Failed to fetch repositories");
  return response.json();
};

export const fetchLanguages = async (repo) => {
  const response = await fetch(`https://api.github.com/repos/Daffabot/${repo.name}/languages`, { headers });
  if (!response.ok) return "Not specified";
  const languageData = await response.json();
  return Object.keys(languageData).join(", ") || "Not specified";
};