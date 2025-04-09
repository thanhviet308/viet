/* routing.js */
/**
 * TÍNH TUYẾN ĐƯỜNG (CHỈ ĐƯỜNG)
 * Bao gồm:
 * - Lấy vị trí hiện tại người dùng
 * - Tạo tuyến đường đến điểm đích bằng Leaflet Routing Machine
 */

let routingControl;

function routeToDestination(destination) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Xóa tuyến đường cũ nếu có
                if (routingControl) {
                    map.removeControl(routingControl);
                }

                // Tạo tuyến đường mới
                routingControl = L.Routing.control({
                    waypoints: [L.latLng(userLat, userLng), destination],
                    routeWhileDragging: true,
                    createMarker: () => null,
                }).addTo(map);
            },
            () => alert("Không thể lấy vị trí của bạn!"),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    } else {
        alert("Trình duyệt của bạn không hỗ trợ định vị.");
    }
}
