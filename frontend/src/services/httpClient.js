import axios from "axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${
      JSON.parse(
        sessionStorage.getItem(
          `oidc.user:${process.env.REACT_APP_AUTHORITY}:${process.env.REACT_APP_CLIENT_ID}`
        )
      ).access_token
    }`,
  },
});

export const httpClient = axios.create({});

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
      `${process.env.REACT_APP_VEHICLE_API_BASE_URL}/api/v1/vehicles`,
      getAuthConfig()
    );
  } catch (e) {
    throw e;
  }
};

export const getAvailableDevices = async () => {
  try {
    return await axios.get(
      `${process.env.REACT_APP_DEVICE_API_BASE_URL}/api/v1/devices/available`,
      getAuthConfig()
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

export const registerUser = async (user) => {
  try {
    return await axios.post(`http://localhost:9090/api/v1/users`, user);
  } catch (e) {
    throw e;
  }
};

export const createVehicle = async (vehicle) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_VEHICLE_API_BASE_URL}/api/v1/vehicles`,
      vehicle
    );
  } catch (e) {
    throw e;
  }
};

export const registerDevice = async (device) => {
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

export const login = async (usernameAndPassword) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
      usernameAndPassword
    );
  } catch (e) {
    throw e;
  }
};
