let map = L.map("map", {
    center: [13.769755502669637, 100.50674958084319],
    zoom: 7
})

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png')
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var baseLayer = {
    "OpenStreetMap": osm.addTo(map),
    "แผนที่ Esri_WorldImagery": Esri_WorldImagery

}
var overlayMap = {

}

L.control.layers(baseLayer, overlayMap).addTo(map)

map.pm.addControls({
    position: "topleft",
    drawMarker: false,
    drawCircleMarker: false,
    drawPolyline: false,
    drawRectangle: false,
    drawPolygon: false,
    drawCircle: false,
    drawText: false,
    editMode: false,
    dragMode: false,
    cutPolygon: false,
    removalMode: false,
    rotateMode: false
});


function getAPI() {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ4OTU3ZDM5OTQzNmI5MmNiNWUzMmRkNzVjOTQ5OGY4NjgxYTc5MDVlNDQ2MjgwYmQ0ODVlZWY0NzgxNTJjOTc2MTQyZDMwY2M2ZDdmNzE0In0.eyJhdWQiOiIyIiwianRpIjoiNDg5NTdkMzk5NDM2YjkyY2I1ZTMyZGQ3NWM5NDk4Zjg2ODFhNzkwNWU0NDYyODBiZDQ4NWVlZjQ3ODE1MmM5NzYxNDJkMzBjYzZkN2Y3MTQiLCJpYXQiOjE2NjYwMjAyOTAsIm5iZiI6MTY2NjAyMDI5MCwiZXhwIjoxNjk3NTU2MjkwLCJzdWIiOiIyMjIxIiwic2NvcGVzIjpbXX0.GsNd7I24_OCkOW-3wOFsQ-2gDgvydOMI4ZFm5gUKzVCr9iLwy2GZNqwr-VavjOi9Wgw43yOWq8lT1id82qv2MzZpSOmSd86xCbxh-4hC8pX9zsBCWh3TgODb1WaKD5MGrhs4E96w-WJyQjPFZLTJLuZnxQxhGTpUYJ5cKtPgIE_E5mseAjWZOgstqN2JnbzewgZk1axNhfS-c-ZxnoZh2hY55Rp7gX5dHU4KMHPzvG-2nbINND3u-DP1bOXhFyTCozQwO9AgRMkK-Cze0F1mi0RInYrhziXMxcP5qV41bGjkZ0W_SW32S8HjmyTrhogz5zjxB3GsHdeqUS8rmINZgCdjlckPRvno7PkSZs0_QYmgHdzApB_1zMmuT9mXpzgi_iLiZlFr_R-0vxp7C0QUQOxaLpv7VCc9prCD6bIdcGMrwqXpLMIfWGYA36HR2kFDgjSiS57YRQXiN6HQyc6jWtqImfcmw1Dp56sm-Rt_cba4K5Y3wDHg1NmP3oQOka69T8321_CXfL_jmu3kc7mFs79z83Q6kMvQT0sT4hmrCDUPgORiDO3C7eg5TNvRX3YwRlOajfwfDLXtjTrYHjrWn4FE4db4PkoxH84ENYdK7ueEofX-xGXZH0cYs2ufChNbIT-MJle_bsXklVElrOgsb3MgZMbRJ75N3RuzXufLLtA"
    let latlng = "18.880031374491722,99.06924445887579,18.7242901142919,98.93035706768914"
    let url = `https://data.tmd.go.th/api/WeatherToday/V1/?type=json?latlng=${latlng}&token=${token}`
    let cat = []
    let val = []

    const icon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/787/787535.png",
        iconSize: [30, 30],
        iconAnchor: [12, 37],
        popupAnchor: [5, -30]
    });
    axios.get(url).then((i) => {
        console.log(i.data.Stations);
        i.data.Stations.forEach(x => {
            console.log(x);
            var marker = L.marker([x.Latitude.Value, x.Longitude.Value], { icon: icon })
                .bindPopup(`<font>สถานีตรวจวัดสภาพอากาศ${x.StationNameTh}</font>`)
                .addTo(map)

            marker.on("click", (e) => {
                document.getElementById("stname").innerHTML = `<h4>${x.StationNameTh}</h4>${x.StationNameEng}</br>
                &nbsp;${x.Observe.Temperature.Value}&nbsp;°C</br>
                ความชื้น&nbsp;${x.Observe.RelativeHumidity.Value}&nbsp;%</br>
                ปริมาณน้ำฝน&nbsp;${x.Observe.Rainfall.Value}&nbsp;มิลลิเมตร</br>
                ความเร็วลม&nbsp;${x.Observe.WindSpeed.Value}&nbsp;กิโลเมตร/ชั่วโมง
                `

                // console.log("dassdadsa");
            })
        });

        // i.data.data.forEach((x) => {
        //     console.log(x);
        //     cat.push(x.station.name)
        //     val.push(Number(x.aqi))
        //     L.marker([x.lat, x.lon], { icon: icon })
        //         .bindPopup(`สถานที่: ${x.station.name} <br> AQI: ${x.aqi}`)
        //         .addTo(map)
        //     document.getElementById("tb").innerHTML += `<tr><td>${x.station.name}</td><td>${x.aqi}</td></tr>`

        // })
        // console.log(cat, val);
        // showChart(cat, val)
    })
}

getAPI()
// map.on("pm:create", (e) => {
//     var lat = e.layer.toGeoJSON().geometry.coordinates[1]
//     var lng = e.layer.toGeoJSON().geometry.coordinates[0]
//     var dist = document.getElementById('dist').value

//     document.getElementById('lat').innerHTML = lat
//     document.getElementById('lng').innerHTML = lng


//     const icon = L.icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
//         iconSize: [32, 32],
//         iconAnchor: [12, 37],
//         popupAnchor: [5, -30]
//     });

//     axios.get(`/api/findhospital/${lat}/${lng}/${dist}`).then(r => {
//         map.eachLayer(k => {
//             console.log(k);
//             if (k.options.icon) {
//                 map.removeLayer(k)
//             }
//         })


//         r.data.data.forEach(i => {
//             var geojson = JSON.parse(i.geojson)
//             // L.geoJSON(geojson).addTo(map)
//             L.marker([geojson.coordinates[1], geojson.coordinates[0]], {
//                 icon: icon,
//                 name: 'red'
//             }).addTo(map)
//         })
//     })

// })



