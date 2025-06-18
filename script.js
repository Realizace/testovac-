
document.addEventListener("DOMContentLoaded", () => {
  const map = L.map('map').setView([50.07, 15.1], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const locations = [
    {
      name: "Chrášťany",
      type: "cesta se zelení",
      path: [[50.0602, 14.92937], [50.05955, 14.94056]],
      icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png"
    },
    {
      name: "Radovesnice II (1)",
      type: "cesta",
      path: [[50.10105, 15.36838], [50.09924, 15.38061]],
      icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png"
    },
    {
      name: "Rozehnaly",
      type: "cesta",
      path: [[50.11312, 15.38702], [50.11286, 15.38734], [50.11232, 15.38701], [50.11134, 15.38914]],
      icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png"
    },
    {
      name: "Radovesnice II (2)",
      type: "cesta",
      path: [[50.10978, 15.37613], [50.11278, 15.37795]],
      icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png"
    }
  ];

  const listEl = document.getElementById("locationList");

  locations.forEach(loc => {
    L.polyline(loc.path, { color: 'gray' }).addTo(map);
    const midIndex = Math.floor(loc.path.length / 2);
    const marker = L.marker(loc.path[midIndex], {
      icon: L.icon({
        iconUrl: loc.icon,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
    }).addTo(map).bindPopup(`<strong>${loc.name}</strong><br>${loc.type}`);

    const item = document.createElement("li");
    item.textContent = loc.name;
    item.onclick = () => {
      map.setView(loc.path[0], 15);
      marker.openPopup();
    };
    listEl.appendChild(item);
  });
});
