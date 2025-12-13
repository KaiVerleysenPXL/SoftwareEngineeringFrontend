<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h2 class="title">My Reimbursement Summary</h2>
      </div>

      <div class="filters">
        <select v-model="filterMonth" @change="loadSummary">
          <option value="">All Months</option>
          <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
        </select>

        <select v-model="filterTransportType" @change="loadSummary">
          <option value="">All Transport Types</option>
          <option value="Car">Car</option>
          <option value="Train">Train</option>
          <option value="Bus">Bus</option>
          <option value="Bike">Bike</option>
          <option value="Plane">Plane</option>
        </select>
      </div>

      <div v-if="loading" class="info">Loading summary...</div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <div v-else class="summary-container">
        <div class="summary-item large">
          <div class="summary-label">Total Trips</div>
          <div class="summary-value">{{ summary.totalTrips || 0 }}</div>
        </div>

        <div class="summary-item large highlight">
          <div class="summary-label">Total Reimbursement</div>
          <div class="summary-value">{{ formatCost(summary.totalCost) }} €</div>
        </div>

        <div class="summary-item">
          <div class="summary-label">Approved</div>
          <div class="summary-value approved">{{ formatCost(summary.approvedCost) }} €</div>
        </div>

        <div class="summary-item">
          <div class="summary-label">Pending</div>
          <div class="summary-value pending">{{ formatCost(summary.pendingCost) }} €</div>
        </div>

        <div class="summary-item">
          <div class="summary-label">Rejected</div>
          <div class="summary-value rejected">{{ formatCost(summary.rejectedCost) }} €</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTripSummary } from '@/services/tripService';

const summary = ref({});
const loading = ref(true);
const error = ref('');

const filterMonth = ref('');
const filterTransportType = ref('');

const months = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

async function loadSummary() {
  loading.value = true;
  error.value = '';
  try {
    const filters = {};
    if (filterMonth.value) filters.month = filterMonth.value;
    if (filterTransportType.value) filters.transportType = filterTransportType.value;

    const res = await getTripSummary(filters);
    summary.value = res.data;
  } catch (e) {
    console.error(e);
    error.value = 'Failed to load summary.';
  } finally {
    loading.value = false;
  }
}

function formatCost(cost) {
  if (cost == null) return '0.00';
  const num = Number(cost);
  return isNaN(num) ? cost : num.toFixed(2);
}

onMounted(() => {
  init();
});
defineExpose({ init });
async function init() {
  loadSummary();
}
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.header {
  margin-bottom: 20px;
}

.title {
  margin: 0;
  color: #333;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filters select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
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

.summary-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 10px;
}

.summary-item {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background-color: #f9fafb;
  text-align: center;
}

.summary-item.large {
  font-size: 110%;
}

.summary-item.highlight {
  background-color: #eff6ff;
  border-color: #3b82f6;
}

.summary-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 8px;
  font-weight: 500;
}

.summary-value {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.summary-value.approved {
  color: #16a34a;
}

.summary-value.pending {
  color: #f59e0b;
}

.summary-value.rejected {
  color: #ef4444;
}
</style>
