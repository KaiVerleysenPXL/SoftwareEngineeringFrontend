<template>
  <div class="page">
    <div class="card">
      <h2 class="title">Register New Trip</h2>

      <form @submit.prevent="submit" class="form">
        <div class="field">
          <label>Date</label>
          <input type="date" v-model="date" required />
        </div>

        <div class="field">
          <label>Destination</label>
          <input v-model="destination" placeholder="Enter destination" required />
        </div>

        <div class="field">
          <label>Distance (km)</label>
          <input type="number" v-model.number="distanceKm" min="0" step="0.1" required />
        </div>

        <div class="field">
          <label>Transport Type</label>
          <select v-model="transportType" required>
            <option value="">Choose transport type</option>
            <option>Bike</option>
            <option>Car</option>
            <option>Public Transport</option>
          </select>
        </div>

        <div class="field">
          <label>Purpose</label>
          <input v-model="purpose" placeholder="Enter purpose" required />
        </div>

        <div class="field">
          <label>Cost (€)</label>
          <input
            type="number"
            v-model.number="cost"
            min="0"
            step="0.01"
            required
            :readonly="transportType === 'Bike' || transportType === 'Car'"
            :class="{ readonly: transportType === 'Bike' || transportType === 'Car' }"
          />
        </div>

        <button type="submit" class="submit-btn">Save Trip</button>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">Trip saved!</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { createTrip } from '@/services/tripService';
import { useRouter } from 'vue-router';

const router = useRouter();

const date = ref('');
const destination = ref('');
const distanceKm = ref(0);
const transportType = ref('');
const purpose = ref('');
const cost = ref(0);

const error = ref('');
const success = ref(false);

// Auto-calculate cost for Bike and Car
watch([transportType, distanceKm], () => {
  if (transportType.value === 'Bike') {
    cost.value = parseFloat((distanceKm.value * 0.25).toFixed(2));
  } else if (transportType.value === 'Car') {
    cost.value = parseFloat((distanceKm.value * 0.4).toFixed(2));
  }
});

async function submit() {
  error.value = '';
  success.value = false;

  try {
    await createTrip({
      date: date.value,
      destination: destination.value,
      distanceKm: distanceKm.value,
      transportType: transportType.value,
      purpose: purpose.value,
      cost: cost.value,
    });

    success.value = true;

    // Clear the form
    date.value = '';
    destination.value = '';
    distanceKm.value = 0;
    transportType.value = '';
    purpose.value = '';
    cost.value = 0;

    // Redirect to My Trips page after a short delay
    setTimeout(() => {
      router.push('/trips');
    }, 600);
  } catch (e) {
    console.error(e);
    error.value = 'Failed to save trip.';
  }
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
  max-width: 500px;
  background: white;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.title {
  text-align: center;
  margin-bottom: 25px;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 5px;
  color: #444;
}

input,
select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

input.readonly {
  background-color: #f3f4f6;
  cursor: default;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.submit-btn {
  background: #3b82f6;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #2563eb;
}

.error {
  color: #ef4444;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

.success {
  color: #22c55e;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}
</style>
