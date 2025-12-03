// services/tripService.js
import api from "@/util/api";

export async function createTrip(trip) {
  // trip must match backend: Date, Destination, DistanceKm, TransportType, Purpose, Cost
  return await api.post("/api/trip", trip);
}

export async function getMyTrips() {
  return await api.get("/api/trip/my");
}

export async function getAllTrips() {
  return await api.get("/api/trip/all");
}

export async function approveTrip(tripId) {
  return await api.put(`/api/trip/${tripId}/approve`);
}

export async function rejectTrip(tripId) {
  return await api.put(`/api/trip/${tripId}/reject`);
}
