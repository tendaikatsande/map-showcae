
import './App.css'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Circle } from 'react-leaflet';

const App = () => {
  // GeoJSON data for Harare
  const harareData = {
    "type": "FeatureCollection",
    "features": [
      // Central Business District
      {
        "type": "Feature",
        "properties": {
          "name": "Harare CBD",
          "type": "Business District",
          "popupContent": "Central Business District of Harare"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [31.045, -17.828],
            [31.052, -17.828],
            [31.052, -17.822],
            [31.045, -17.822],
            [31.045, -17.828]
          ]]
        }
      },
      // National Sports Stadium
      {
        "type": "Feature",
        "properties": {
          "name": "National Sports Stadium",
          "type": "Stadium",
          "popupContent": "Zimbabwe's largest sports venue"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [31.027778, -17.845833]
        }
      },
      // University of Zimbabwe
      {
        "type": "Feature",
        "properties": {
          "name": "University of Zimbabwe",
          "type": "Education",
          "popupContent": "Zimbabwe's oldest university"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [31.037778, -17.783889]
        }
      },
      // Mukuvisi River
      {
        "type": "Feature",
        "properties": {
          "name": "Mukuvisi River",
          "type": "River",
          "popupContent": "Major river flowing through Harare"
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [31.075, -17.845],
            [31.065, -17.835],
            [31.055, -17.825],
            [31.045, -17.815],
            [31.035, -17.805]
          ]
        }
      },
      // Marimba River
      {
        "type": "Feature",
        "properties": {
          "name": "Marimba River",
          "type": "River",
          "popupContent": "River flowing through western Harare"
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [31.015, -17.825],
            [31.025, -17.835],
            [31.035, -17.845],
            [31.045, -17.855]
          ]
        }
      }
    ]
  };

  // Style function for GeoJSON features
  const styleFeature = (feature) => {
    switch (feature.properties.type) {
      case 'Business District':
        return {
          fillColor: '#ff7800',
          weight: 2,
          opacity: 1,
          color: '#ff7800',
          fillOpacity: 0.4
        };
      case 'River':
        return {
          color: '#0077be',
          weight: 3,
          opacity: 0.8
        };
      default:
        return {
          fillColor: '#3388ff',
          weight: 2,
          opacity: 1,
          color: '#3388ff',
          fillOpacity: 0.4
        };
    }
  };

  // Popup function for GeoJSON features
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(`
        <h3>${feature.properties.name}</h3>
        <p>${feature.properties.popupContent}</p>
      `);
    }
  };

  // Avondale coordinates
  const avondaleCoords = [-17.8075, 31.0408];

  return (
    <MapContainer
      center={[-17.824858, 31.053028]}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: '98vh',
        width: '99vw',
        margin: 0
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON
        data={harareData}
        style={styleFeature}
        onEachFeature={onEachFeature}
      />

      {/* Central marker for Harare CBD */}
      <Marker position={[-17.824858, 31.053028]}>
        <Popup>
          <h3>Harare City Center</h3>
          <p>Capital city of Zimbabwe</p>
        </Popup>
      </Marker>

      {/* Avondale marker and 2km radius circle */}
      <Marker position={avondaleCoords}>
        <Popup>
          <h3>Avondale</h3>
          <p>Shopping and residential area</p>
        </Popup>
      </Marker>
      <Circle
        center={avondaleCoords}
        radius={2000} // 2km in meters
        pathOptions={{
          color: '#2c3e50',
          fillColor: '#2c3e50',
          fillOpacity: 0.1
        }}
      >
        <Popup>2km radius around Avondale</Popup>
      </Circle>
    </MapContainer>
  );
};

export default App;