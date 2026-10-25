const API_KEY = "9aGIr2YciyGPrmJYDNxs"; 

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

// find a value (country, province, etc.) in the API response by its type
function findByType(feature, types) {
  const all = [feature, ...(feature.context || [])];
  for (const type of types) {
    const item = all.find((c) => c.id && c.id.startsWith(type + "."));
    if (item) return item.text;
  }
  return "-";
}

// put text into an element by its id
function setText(id, value) {
  document.getElementById(id).textContent = value;
}

// show the result on the page
function showResult(data) {
  const f = data.features[0];
  const [lon, lat] = f.center || f.geometry.coordinates;

  setText("placeName", f.place_name || "-");
  setText("matchingText", f.matching_text || f.text || "-");
  setText("type", f.place_type ? f.place_type.join(", ") : "-");
  setText("country", findByType(f, ["country"]));
  setText("province", findByType(f, ["region"]));
  setText("district", findByType(f, ["municipal_district", "locality", "municipality", "county", "subregion"]));
  setText("coordinates", lon.toFixed(5) + ", " + lat.toFixed(5));
  setText("longitude", lon);
  setText("latitude", lat);

  // map under the results (OpenStreetMap embed)
  const d = 0.05;
  const box = f.bbox || [lon - d, lat - d, lon + d, lat + d];
  document.getElementById("map").src =
    `https://www.openstreetmap.org/export/embed.html?bbox=${box.join(",")}&layer=mapnik&marker=${lat},${lon}`;

  result.hidden = false;
}