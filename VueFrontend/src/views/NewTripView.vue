<template>
  <div>
    <h2>Register New Trip</h2>
    <form @submit.prevent="submit">
      <div>
        <label>Date</label>
        <input type="date" v-model="date" required />
      </div>

      <div>
        <label>Destination</label>
        <input v-model="destination" required />
      </div>

      <div>
        <label>Distance (km)</label>
        <input type="number" v-model.number="distanceKm" min="0" step="0.1" required />
      </div>

      <div>
        <label>Transport Type</label>
        <select v-model="transportType" required>
          <option value="">-- choose --</option>
          <option>Car</option>
          <option>Bike</option>
          <option>Train</option>
          <option>Bus</option>
        </select>
      </div>

      <div>
        <label>Purpose</label>
        <input v-model="purpose" required />
      </div>

      <div>
        <label>Cost</label>
        <input type="number" v-model.number="cost" min="0" step="0.01" required />
      </div>

      <button type="submit">Save Trip</button>

      <p v-if="error" style="color:red">{{ error }}</p>
      <p v-if="success" style="color:green">Trip saved!</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createTrip } from "@/services/tripService";

const date = ref("");
const destination = ref("");
const distanceKm = ref(0);
const transportType = ref("");
const purpose = ref("");
const cost = ref(0);

const error = ref("");
const success = ref(false);

async function submit() {
  error.value = "";
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
  } catch (e) {
    console.error(e);
    error.value = "Failed to save trip.";
  }
}
</script>