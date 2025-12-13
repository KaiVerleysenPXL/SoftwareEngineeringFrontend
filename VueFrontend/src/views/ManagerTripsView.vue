<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h2 class="title">Manage Trips</h2>
      </div>

      <!-- Filters Section -->
      <div class="filters">
        <div class="field">
          <label>Filter by Employee</label>
          <input
            v-model="filters.employee"
            placeholder="Enter employee name"
            @input="applyFilters"
          />
        </div>

        <div class="field">
          <label>Transport Type</label>
          <select v-model="filters.transportType" @change="applyFilters">
            <option value="">All</option>
            <option>Car</option>
            <option>Bike</option>
            <option>Train</option>
            <option>Bus</option>
          </select>
        </div>

        <div class="field">
          <label>Month</label>
          <input type="month" v-model="filters.month" @change="applyFilters" />
        </div>

        <div class="field">
          <label>Status</label>
          <select v-model="filters.status" @change="applyFilters">
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button class="clear-btn" @click="clearFilters">Clear Filters</button>
      </div>

      <div v-if="loading" class="info">Loading trips...</div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <div v-else-if="filteredTrips.length === 0" class="info">
        No trips found matching your filters.
      </div>

      <ul v-else class="trip-list">
        <li v-for="t in filteredTrips" :key="t.id" class="trip-item">
          <div class="trip-content">
            <div class="trip-main">
              <div class="trip-destination">
                {{ t.destination }}
              </div>
              <div class="trip-meta">
                <span><strong>Employee:</strong> {{ t.username || 'Unknown' }}</span>
                <span>• {{ formatDate(t.date) }}</span>
                <span>• {{ t.transportType }}</span>
                <span>• {{ t.distanceKm }} km</span>
              </div>
              <div class="trip-purpose"><strong>Purpose:</strong> {{ t.purpose }}</div>
            </div>

            <div class="trip-right">
              <div class="trip-cost">{{ formatCost(t.cost) }} €</div>
              <span class="status-pill" :class="statusClass(t.status)">
                {{ t.status }}
              </span>
            </div>
          </div>

          <div v-if="t.status === 'Pending'" class="trip-actions">
            <button
              class="approve-btn"
              @click="handleApprove(t.id)"
              :disabled="processingId === t.id"
            >
              {{ processingId === t.id ? 'Processing...' : 'Approve' }}
            </button>
            <button
              class="reject-btn"
              @click="handleReject(t.id)"
              :disabled="processingId === t.id"
            >
              {{ processingId === t.id ? 'Processing...' : 'Reject' }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAllTrips, approveTrip, rejectTrip } from '@/services/tripService';

const trips = ref([]);
const loading = ref(true);
const error = ref('');
const processingId = ref(null);

const filters = ref({
  employee: '',
  transportType: '',
  month: '',
  status: '',
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

function formatCost(cost) {
  if (cost == null) return '0.00';
  const num = Number(cost);
  return isNaN(num) ? cost : num.toFixed(2);
}

function statusClass(status) {
  if (!status) return 'status-pending';
  switch (status.toLowerCase()) {
    case 'approved':
      return 'status-approved';
    case 'rejected':
      return 'status-rejected';
    default:
      return 'status-pending';
  }
}

const filteredTrips = computed(() => {
  let result = [...trips.value];

  // Filter by employee
  if (filters.value.employee.trim()) {
    const searchTerm = filters.value.employee.toLowerCase();
    result = result.filter((t) => (t.username || '').toLowerCase().includes(searchTerm));
  }

  // Filter by transport type
  if (filters.value.transportType) {
    result = result.filter((t) => t.transportType === filters.value.transportType);
  }

  // Filter by month
  if (filters.value.month) {
    const [year, month] = filters.value.month.split('-');
    result = result.filter((t) => {
      const tripDate = new Date(t.date);
      return (
        tripDate.getFullYear() === parseInt(year) && tripDate.getMonth() + 1 === parseInt(month)
      );
    });
  }

  // Filter by status
  if (filters.value.status) {
    result = result.filter((t) => t.status.toLowerCase() === filters.value.status.toLowerCase());
  }

  return result;
});

function applyFilters() {
  // Filters are computed, so nothing to do here
}

function clearFilters() {
  filters.value.employee = '';
  filters.value.transportType = '';
  filters.value.month = '';
  filters.value.status = '';
}

async function handleApprove(tripId) {
  if (processingId.value) return;

  processingId.value = tripId;
  error.value = '';

  try {
    await approveTrip(tripId);

    // Update the trip status locally
    const trip = trips.value.find((t) => t.id === tripId);
    if (trip) {
      trip.status = 'Approved';
    }
  } catch (e) {
    console.error(e);
    error.value = 'Failed to approve trip.';
  } finally {
    processingId.value = null;
  }
}

async function handleReject(tripId) {
  if (processingId.value) return;

  processingId.value = tripId;
  error.value = '';

  try {
    await rejectTrip(tripId);

    // Update the trip status locally
    const trip = trips.value.find((t) => t.id === tripId);
    if (trip) {
      trip.status = 'Rejected';
    }
  } catch (e) {
    console.error(e);
    error.value = 'Failed to reject trip.';
  } finally {
    processingId.value = null;
  }
}

async function loadTrips() {
  loading.value = true;
  error.value = '';

  try {
    const res = await getAllTrips();
    trips.value = res.data;
  } catch (e) {
    console.error(e);
    error.value = 'Failed to load trips.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadTrips();
});
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  padding: 40px 10px;
}

.card {
  width: 100%;
  max-width: 900px;
  background: white;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.title {
  margin: 0;
  color: #333;
}

/* Filters section */
.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.field {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #444;
  font-size: 13px;
}

input,
select {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  background: white;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.clear-btn {
  background: white;
  border: 1px solid #d1d5db;
  color: #6b7280;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  align-self: flex-end;
}

.clear-btn:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.info {
  text-align: center;
  color: #666;
  margin-top: 10px;
}

.error {
  color: #ef4444;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

/* Trip list styling */
.trip-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trip-item {
  padding: 14px 16px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.trip-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.trip-main {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.trip-destination {
  font-weight: 600;
  color: #111827;
  font-size: 15px;
}

.trip-meta {
  font-size: 13px;
  color: #6b7280;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.trip-purpose {
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
}

.trip-right {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
}

.trip-cost {
  font-weight: 600;
  color: #111827;
}

/* Status pills */
.status-pill {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.status-pending {
  background-color: #fef3c7;
  color: #92400e;
}

.status-approved {
  background-color: #dcfce7;
  color: #166534;
}

.status-rejected {
  background-color: #fee2e2;
  color: #991b1b;
}

/* Action buttons */
.trip-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
}

.approve-btn,
.reject-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.approve-btn {
  background: #22c55e;
  color: white;
}

.approve-btn:hover:not(:disabled) {
  background: #16a34a;
}

.reject-btn {
  background: #ef4444;
  color: white;
}

.reject-btn:hover:not(:disabled) {
  background: #dc2626;
}

.approve-btn:disabled,
.reject-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
