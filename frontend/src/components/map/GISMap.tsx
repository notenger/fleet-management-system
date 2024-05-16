import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useOutletContext } from "react-router-dom";
import VehicleCard from "./VehicleCard";
import RotatedMarker from "./RotatedMarker";
import truckIcon1 from "../../assets/truck1.png";
import truckIcon2 from "../../assets/truck2.png";
import truckIcon3 from "../../assets/truck3.png";
import locationIcon from "../../assets/geomarker.png";
import { Icon } from "leaflet";
import { getVehicles, getPlaces } from "../../services/httpClient.js";
import SockJsClient from "react-stomp";
import "leaflet-rotatedmarker";
import "leaflet/dist/leaflet.css";
import "./GISMap.css";
import AddVehicleCard from "./AddVehicleCard";

const vehicleIcons = [
  new Icon({
    iconUrl: truckIcon1,
    iconSize: [40, 90],
  }),
  new Icon({
    iconUrl: truckIcon2,
    iconSize: [75, 95],
  }),
  new Icon({
    iconUrl: truckIcon3,
    iconSize: [30, 90],
  }),
];

const landmarkIcon = new Icon({
  iconUrl: locationIcon,
  iconSize: [38, 38],
});

const SOCKET_URL = `${process.env.REACT_APP_API_GATEWAY_URL}/ws-message`;
// const SOCKET_URL = "http://localhost:8082/ws-message";

function GISMap() {
  const [landmarks, setLandmarks] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isConnected, setConnected] = useState(false);
  const [firstMessageReceived, setFirstMessageReceived] = useState(false);
  const [setTitle] = useOutletContext();

  const fetchLocations = () => {
    getPlaces()
      .then((res) => {
        setLandmarks(res.data);
        console.log("Successfully fetched locations");
      })
      .catch((err) => {
        console.error("Error trying feth locations:", err);
      })
      .finally(() => {});
  };

  const fetchVehicles = () => {
    getVehicles()
      .then((res) => {
        setVehicles(res.data);
        console.log("Successfully fetched vehicles");
      })
      .catch((err) => {
        console.log("Error trying fetch vehicles:", err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    setTitle("Map");
    fetchLocations();
    fetchVehicles();
  }, []);

  const onConnect = () => {
    if (isConnected === false) {
      console.log("Connected to websocket");
      setConnected(true);
    }
  };

  const onMessageReceived = (message) => {
    if (firstMessageReceived === false) {
      console.log("Message:", message);
      setFirstMessageReceived(true);
    }

    const vehicle = vehicles.find((veh) => veh.deviceId === message.deviceId);

    if (vehicle) {
      const updatedVehicles = vehicles.map((veh) =>
        veh.deviceId === message.deviceId
          ? {
              ...veh,
              latitude: message.latitude,
              longitude: message.longitude,
              heading: message.heading,
              pathData: message.pathData,
            }
          : veh
      );

      setVehicles(updatedVehicles);
    }
  };

  const pickVehicleIcon = (vehicleId) => {
    return vehicleIcons[vehicleId % vehicleIcons.length];
  };

  const [selectedVehicleId, setSelectedVehicleId] = useState();
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);

  return (
    <>
      <MapContainer center={[50.080345, 14.428973]} zoom={5}>
        <TileLayer
          attribution="Google Maps"
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
        {selectedVehicle && selectedVehicle.pathData && (
          <Polyline
            positions={selectedVehicle.pathData}
            pathOptions={{ color: "red", dashArray: [10, 10] }}
          />
        )}
        {landmarks.map((landmark, index) => (
          <Marker
            icon={landmarkIcon}
            position={[landmark.latitude, landmark.longitude]}
            key={index}
            data={landmark.name}
          >
            <Popup>
              <AddVehicleCard
                landmark={landmark.name}
                fetchVehicles={fetchVehicles}
              />
            </Popup>
          </Marker>
        ))}
        {vehicles.map((vehicle) => {
          if (
            vehicle &&
            vehicle.latitude &&
            vehicle.longitude &&
            vehicle.heading
          ) {
            return (
              <RotatedMarker
                key={vehicle.id}
                position={[vehicle.latitude, vehicle.longitude]}
                icon={pickVehicleIcon(vehicle.id)}
                rotationOrigin="center"
                rotationAngle={vehicle.heading * (180 / Math.PI)}
                data={vehicle.id}
                eventHandlers={{
                  click: (e) => {
                    setSelectedVehicleId(e.target.options.data);
                  },
                }}
              >
                <Popup>
                  <VehicleCard
                    vehicle={vehicle}
                    fetchVehicles={fetchVehicles}
                  />
                </Popup>
              </RotatedMarker>
            );
          } else {
            return null;
          }
        })}
      </MapContainer>

      <SockJsClient
        url={SOCKET_URL}
        topics={["/telematics/geolocation"]}
        onConnect={onConnect}
        onMessage={(message) => onMessageReceived(message)}
        debug={false}
      />
    </>
  );
}

export default GISMap;
