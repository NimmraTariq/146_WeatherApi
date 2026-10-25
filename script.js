const API_KEY = 9aGIr2YciyGPrmJYDNxs;

const form = document.getElementById("form");
const input = document.getElementById("location");
const statusEl = document.getElementById("status");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = input.value.trim();
  if (!q) return;

  const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(q)}.json?key=${API_KEY}&limit=1&language=en`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});