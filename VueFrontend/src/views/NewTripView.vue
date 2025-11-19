<!-- src/views/NewTripView.vue -->
<template>
  <div class="new-trip">
    <h1>Register Trip / Commute</h1>

    <form @submit.prevent="submit">
      <div class="field">
        <label>Date</label>
        <input type="date" v-model="date" required />
      </div>

      <div class="field">
        <label>Destination</label>
        <input type="text" v-model="destination" required />
      </div>

      <div class="field">
        <label>Distance (km)</label>
        <input type="number" step="0.1" min="0" v-model.number="distanceKm" required />
      </div>

      <div class="field">
        <label>Transport type</label>
        <select v-model="transportType" required>
          <option disabled value="">Choose…</option>
          <option>Car</option>
          <option>Bike</option>
          <option>Train</option>
          <option>Bus</option>
          <option>Walk</option>
          <option>Other</option>
        </select>
      </div>

      <div class="field">
        <label>Purpose</label>
        <input type="text" v-model="purpose" placeholder="Commute, client visit…" required />
      </div>

      <div class="field">
        <label>Cost</label>
        <input type="number" step="0.01" min="0" v-model.number="cost" required />
      </div>

      <!-- temp hard-coded, in a real app we get the logged in user -->
      <div class="field">
        <label>User ID</label>
        <input type="number" v-model.number="userId" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Saving…' : 'Save trip' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">Trip saved!</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Backend URL + port
const API_BASE = 'http://localhost:5019'

const date = ref('')
const destination = ref('')
const distanceKm = ref(null)
const transportType = ref('')
const purpose = ref('')
const cost = ref(null)
const userId = ref(1) // demo value

const loading = ref(false)
const error = ref('')
const success = ref(false)

const submit = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    const payload = {
      userId: userId.value,
      date: new Date(date.value).toISOString(),
      destination: destination.value,
      distanceKm: distanceKm.value,
      transportType: transportType.value,
      purpose: purpose.value,
      cost: cost.value
    }

    await axios.post(`${API_BASE}/trip`, payload)
    success.value = true
  } catch (e) {
    error.value = 'Could not save trip.'
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.new-trip {
  max-width: 500px;
  margin: 2rem auto;
}
.field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
label {
  font-weight: 600;
  margin-bottom: 0.25rem;
}
button {
  padding: 0.5rem 1rem;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
.success {
  color: green;
  margin-top: 0.5rem;
}
</style>
