/* layer-control.js */
/**
 * QUẢN LÝ CÁC LỚP GEOJSON TRÊN BẢN ĐỒ
 * Bao gồm:
 * - Tải dữ liệu GeoJSON từ API
 * - Tạo checkbox bật/tắt lớp dữ liệu
 * - Tùy biến marker và popup
 * - Sidebar hiển thị thông tin khi click marker
 */

const poiLayers = L.layerGroup().addTo(map);
const layersContainer = document.querySelector(".layers");
const layersButton = "all layers";
const arrayLayers = ["cinema"];

function generateButton(name) {
    const id = name === layersButton ? "all-layers" : name;
    const templateLayer = `
    <li class="layer-element">
      <label for="${id}">
        <input type="checkbox" id="${id}" name="item" class="item" value="${name}" checked>
        <span>${name}</span>
      </label>
    </li>`;
    layersContainer.insertAdjacentHTML("beforeend", templateLayer);
    document.querySelector(`#${id}`).addEventListener("change", (e) => {
        showHideLayer(e.target);
    });
}
generateButton(layersButton);

// Hàm mở sidebar và dịch chuyển bản đồ
function openSidebar(content) {
    const sidebar = document.getElementById("sidebar");
    const sidebarContent = sidebar.querySelector(".sidebar-content");
    const mapEl = document.getElementById("map");

    sidebarContent.innerHTML = content;
    sidebar.classList.add("open");
    mapEl.classList.add("shifted");
    document.querySelector(".leaflet-left").classList.add("shifted");

    setTimeout(() => {
        map.invalidateSize();
    }, 300);
}

// Hàm đóng sidebar và reset map
function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mapEl = document.getElementById("map");

    sidebar.classList.remove("open");
    mapEl.classList.remove("shifted");
    document.querySelector(".leaflet-left").classList.remove("shifted");

    setTimeout(() => {
        map.invalidateSize();
    }, 300);
}

// Cấu hình hiển thị GeoJSON
geojsonOpts = {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.divIcon({
                className: "cinema-icon",
                html: "<span class='emoji'>🎥</span>",
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -25],
            }),
        }).on("click", () => {
            map.setView(latlng, zoom);

            const content = `
                <h3>${feature.properties.name}</h3>
                <p>Địa điểm chiếu phim</p>
                <button onclick="routeToDestination([${latlng.lat}, ${latlng.lng}])">Chỉ đường</button>
            `;
            openSidebar(content);
        });
    },
};

// Load dữ liệu các lớp
arrayLayers.map((layerName) => {
    generateButton(layerName);
    fetchData(`/maps/api/geojson/${layerName}/`)
        .then((data) => {
            if (!data) return;
            const layer = L.geoJSON(data, geojsonOpts).addTo(map);
            window["layer_" + layerName] = layer;
        });
});

// Bật/tắt lớp
function showHideLayer(target) {
    const id = target.id;
    if (id === "all-layers") {
        arrayLayers.forEach((layerName) => {
            checkedType(layerName, target.checked);
        });
    } else {
        checkedType(id, target.checked);
    }

    const checkedBoxes = document.querySelectorAll("input[name=item]:checked");
    document.querySelector("#all-layers").checked = checkedBoxes.length === arrayLayers.length;
}

function checkedType(id, type) {
    const layer = window["layer_" + id];
    if (!layer) {
        console.warn(`Layer "${id}" chưa load xong!`);
        return;
    }

    if (type) {
        map.addLayer(layer);
        map.fitBounds(layer.getBounds(), { padding: [50, 50] });
    } else {
        map.removeLayer(layer);
    }

    document.querySelector(`#${id}`).checked = type;
}

// Hàm fetch dữ liệu geojson từ API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Lỗi khi fetch dữ liệu:", err);
    }
}
