/* map-config.js */
/**
 * CẤU HÌNH VÀ KHỞI TẠO BẢN ĐỒ
 * Bao gồm:
 * - Cấu hình Leaflet map
 * - Thêm tile layer OpenStreetMap
 * - Hiển thị vị trí người dùng (📍)
 */

let config = {
    minZoom: 7,
    maxZoom: 18,
    fullscreenControl: true,
};
const zoom = 18;
const lat = 10.8231;
const lng = 106.6297;
const map = L.map("map", config).setView([lat, lng], zoom);

// Load tile OpenStreetMap
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Hiển thị vị trí người dùng khi nhấn nút 📍
let userLocationMarker;
let userLocationCircle;

const locationButton = L.control({ position: "topleft" });
locationButton.onAdd = function () {
    const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");
    div.innerHTML = '<a href="#" title="Hiển thị vị trí của tôi" style="font-size: 18px;">📍</a>';
    div.style.background = "white";
    div.style.cursor = "pointer";
    div.onclick = function () {
        getCurrentLocation();
        return false;
    };
    return div;
};
locationButton.addTo(map);

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const accuracy = position.coords.accuracy;

                if (userLocationMarker) map.removeLayer(userLocationMarker);
                if (userLocationCircle) map.removeLayer(userLocationCircle);

                userLocationMarker = L.marker([userLat, userLng], {
                    icon: L.divIcon({
                        className: "user-location",
                        html: "<span class='emoji'>📍</span>",
                        iconSize: [40, 40],
                        iconAnchor: [20, 20],
                        popupAnchor: [0, -25],
                    }),
                }).addTo(map)
                    .bindPopup("Vị trí của bạn")
                    .openPopup();

                userLocationCircle = L.circle([userLat, userLng], {
                    radius: accuracy,
                    color: "#4285F4",
                    fillColor: "#4285F4",
                    fillOpacity: 0.15,
                }).addTo(map);

                map.setView([userLat, userLng], zoom);
            },
            function (error) {
                const msg = {
                    1: "Người dùng đã từ chối yêu cầu truy cập vị trí.",
                    2: "Thông tin vị trí không có sẵn.",
                    3: "Yêu cầu lấy vị trí người dùng đã hết thời gian.",
                }[error.code] || "Đã xảy ra lỗi không xác định.";
                alert(msg);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    } else {
        alert("Trình duyệt của bạn không hỗ trợ định vị.");
    }
}
