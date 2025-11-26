<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h2 class="title">My Trips</h2>
        <button class="secondary-btn" @click="goToNewTrip">
          + New Trip
        </button>
      </div>

      <div v-if="loading" class="info">
        Loading trips...
      </div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <div v-else-if="trips.length === 0" class="info">
        You haven't submitted any trips yet.
      </div>

      <ul v-else class="trip-list">
        <li v-for="t in trips" :key="t.id" class="trip-item">
          <div class="trip-main">
            <div class="trip-destination">
              {{ t.destination }}
            </div>
            <div class="trip-meta">
              <span>{{ formatDate(t.date) }}</span>
              <span>• {{ t.transportType }}</span>
              <span>• {{ t.distanceKm }} km</span>
            </div>
          </div>

          <div class="trip-right">
            <div class="trip-cost">
              {{ formatCost(t.cost) }} €
            </div>
            <span class="status-pill" :class="statusClass(t.status)">
              {{ t.status }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getMyTrips } from "@/services/tripService";

const router = useRouter();

const trips = ref([]);
const loading = ref(true);
const error = ref("");

function goToNewTrip() {
  router.push("/trips/new");
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

function formatCost(cost) {
  if (cost == null) return "0.00";
  const num = Number(cost);
  return isNaN(num) ? cost : num.toFixed(2);
}

function statusClass(status) {
  if (!status) return "status-pending";
  switch (status.toLowerCase()) {
    case "approved":
      return "status-approved";
    case "rejected":
      return "status-rejected";
    default:
      return "status-pending";
  }
}

onMounted(async () => {
  try {
    const res = await getMyTrips(); // expects /api/trip/my
    trips.value = res.data;
  } catch (e) {
    console.error(e);
    error.value = "Failed to load trips.";
  } finally {
    loading.value = false;
  }
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
  max-width: 700px;
  background: white;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
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

.secondary-btn {
  background: white;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.secondary-btn:hover {
  background: #eff6ff;
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
  gap: 10px;
}

.trip-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.trip-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.trip-destination {
  font-weight: 600;
  color: #111827;
}

.trip-meta {
  font-size: 13px;
  color: #6b7280;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
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
</style>