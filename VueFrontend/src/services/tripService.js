// services/tripService.js
import api from '@/util/api';

export async function createTrip(trip) {
  // trip must match backend: Date, Destination, DistanceKm, TransportType, Purpose, Cost
  return await api.post('/trips', trip);
}

export async function getMyTrips() {
  return await api.get('/trips');
}

export async function getAllTrips() {
  return await api.get('/trips/all');
}

export async function approveTrip(tripId) {
  return await api.post(`/trips/${tripId}/approve`);
}

export async function rejectTrip(tripId) {
  return await api.post(`/trips/${tripId}/reject`);
}

export async function getTripSummary(filters = {}) {
  const params = new URLSearchParams();
  if (filters.month) params.append('month', filters.month);
  if (filters.transportType) params.append('transportType', filters.transportType);
  const query = params.toString();
  return await api.get(`/trips/summary${query ? '?' + query : ''}`);
}

export async function exportData(format) {
  const response = await api.get(`/trips/export?format=${format}`, {
    responseType: 'blob',
  });
  return response.data;
}
