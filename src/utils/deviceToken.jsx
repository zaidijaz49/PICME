// utils/device.js

// Generate or get device token
export function getDeviceToken() {
  let token = localStorage.getItem("device_token");

  if (!token) {
    token = crypto.randomUUID();   // browser built-in
    localStorage.setItem("device_token", token);
  }

  return token;
}

// Save JWT token AFTER login
export function saveJwtToken(token) {
  localStorage.setItem("token", token);
}

// Get JWT token whenever needed
export function getJwtToken() {
  return localStorage.getItem("token");
}