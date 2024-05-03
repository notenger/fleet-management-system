import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Title from "../muitemplate/Title";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createVehicle,
  bindVehicle,
  registerDevice,
  getAvailableDevices,
} from "../../services/httpClient.js";

export default function AddVehicleCard({ landmark, fetchVehicles }) {
  const [vehicleSpeed, setVehicleSpeed] = useState(160);

  const handleLocateVehicleClick = async () => {
    try {
      let availableDevicesResponse = await getAvailableDevices();

      let availableDevices = availableDevicesResponse.data;

      if (availableDevices.length === 0) {
        await registerDevice({
          serialNumber: "0055111999",
          averageSpeed: vehicleSpeed,
        });

        availableDevicesResponse = await getAvailableDevices();
        availableDevices = availableDevicesResponse.data;
      }

      const randomIndex = Math.floor(Math.random() * availableDevices.length);
      const randomDevice = availableDevices[randomIndex];

      await createVehicle({
        vin: "5147309378",
        make: "AAA",
        model: "cc",
        year: 2016,
        groupName: landmark,
        deviceId: randomDevice.id,
      });

      fetchVehicles();
    } catch (error) {
      console.error("Error creating vehicle:", error);
    }
  };

  return (
    <Stack spacing={2}>
      <Title>{landmark}</Title>
      <TextField
        id="outlined-basic"
        label="Average speed, km/h"
        variant="outlined"
        value={vehicleSpeed}
        onChange={(e) => {
          setVehicleSpeed(e.target.value);
        }}
      />
      <Button variant="outlined" onClick={handleLocateVehicleClick}>
        Locate vehicle
      </Button>
    </Stack>
  );
}
