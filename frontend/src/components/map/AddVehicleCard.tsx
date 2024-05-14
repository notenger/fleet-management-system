import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Title from "../shared/Title";
import {
  addVehicle,
  registerDevice,
  getAvailableDevices,
} from "../../services/httpClient.js";

export default function AddVehicleCard({ landmark, fetchVehicles }) {
  const [vehicleSpeed, setVehicleSpeed] = useState(400);

  const generateRandomString = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleLocateVehicleClick = async () => {
    try {
      let availableDevicesResponse = await getAvailableDevices();

      let availableDevices = availableDevicesResponse.data;

      if (availableDevices.length === 0) {
        await registerDevice({
          serialNumber: generateRandomString(10),
          averageSpeed: vehicleSpeed,
        });

        availableDevicesResponse = await getAvailableDevices();
        availableDevices = availableDevicesResponse.data;
      }

      const randomIndex = Math.floor(Math.random() * availableDevices.length);
      const randomDevice = availableDevices[randomIndex];

      await addVehicle({
        vin: generateRandomString(10),
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
        label="Average speed, km/h/100"
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
