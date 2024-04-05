import axios from "axios";

export const getPlaces = async () => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_PLACE_API_BASE_URL}/api/v1/places`
    );
  } catch (e) {
    throw e;
  }
};

export const getVehicles = async () => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_VEHICLE_API_BASE_URL}/api/v1/vehicles`
    );
  } catch (e) {
    throw e;
  }
};

export const getDevice = async (id) => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_DEVICE_API_BASE_URL}/api/v1/devices/${id}`
    );
  } catch (e) {
    throw e;
  }
};

export const saveVehicle = async (vehicle) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_VEHICLE_API_BASE_URL}/api/v1/vehicles`,
      vehicle
    );
  } catch (e) {
    throw e;
  }
};

export const saveDevice = async (device) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_DEVICE_API_BASE_URL}/api/v1/devices`,
      device
    );
  } catch (e) {
    throw e;
  }
};

export const updateVehicle = async (id, update) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_VEHICLE_API_BASE_URL}/api/v1/vehicles/${id}`,
      update
    );
  } catch (e) {
    throw e;
  }
};

export const bindVehicle = async (id) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_VEHICLE_API_BASE_URL}/api/v1/vehicles/bind/${id}`
    );
  } catch (e) {
    throw e;
  }
};

export const updateDevice = async (id, update) => {
  try {
    return await axios.put(
      `${process.env.REACT_APP_DEVICE_API_BASE_URL}/api/v1/devices/${id}`,
      update
    );
  } catch (e) {
    throw e;
  }
};

export const deleteVehicle = async (id) => {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_VEHICLE_API_BASE_URL}/api/v1/vehicles/${id}`
    );
  } catch (e) {
    throw e;
  }
};

export const deleteDevice = async (id) => {
  try {
    return await axios.delete(
      `${process.env.REACT_APP_DEVICE_API_BASE_URL}/api/v1/devices/${id}`
    );
  } catch (e) {
    throw e;
  }
};