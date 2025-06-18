
document.addEventListener("DOMContentLoaded", () => {
  const map = L.map('map').setView([50.07, 15.1], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const typeColors = {
    "cesta": "gray",
    "cesta se zelení": "green"
  };

  const typeIcons = {
    "cesta": "https://cdn-icons-png.flaticon.com/512/9128/9128878.png",
    "cesta se zelení": "https://cdn-icons-png.flaticon.com/512/854/854878.png"
  };

  const locations = [
    {
      name: "Chrášťany",
      type: "cesta se zelení",
      path: [[50.0602, 14.92937], [50.05955, 14.94056]]
    },
    {
      name: "Radovesnice II (1)",
      type: "cesta",
      path: [[50.10105, 15.36838], [50.09924, 15.38061]]
    },
    {
      name: "Rozehnaly",
      type: "cesta",
      path: [[50.11312, 15.38702], [50.11286, 15.38734], [50.11232, 15.38701], [50.11134, 15.38914]]
    },
    {
      name: "Radovesnice II (2)",
      type: "cesta",
      path: [[50.10978, 15.37613], [50.11278, 15.37795]]
    }
  ];

  const groupContainer = document.getElementById("locationGroups");
  const markers = {};

  const grouped = {};
  locations.forEach(loc => {
    if (!grouped[loc.type]) grouped[loc.type] = [];
    grouped[loc.type].push(loc);
  });

  Object.keys(grouped).forEach(type => {
    const color = typeColors[type] || "gray";
    const iconUrl = typeIcons[type] || typeIcons["cesta"];
    const title = document.createElement("div");
    title.className = "group-title";
    title.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    const list = document.createElement("ul");
    list.className = "group-list";

    grouped[type].forEach(loc => {
      const polyline = L.polyline(loc.path, { color }).addTo(map);
      const mid = loc.path[Math.floor(loc.path.length / 2)];
      const marker = L.marker(mid, {
        icon: L.icon({
          iconUrl,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      }).addTo(map).bindPopup(`<strong>${loc.name}</strong><br>${loc.type}`);
      markers[loc.name] = { marker, path: loc.path };

      const li = document.createElement("li");
      li.textContent = loc.name;
      li.onclick = () => {
        map.setView(loc.path[0], 15);
        marker.openPopup();
      };
      list.appendChild(li);
    });

    groupContainer.appendChild(title);
    groupContainer.appendChild(list);
  });
});
