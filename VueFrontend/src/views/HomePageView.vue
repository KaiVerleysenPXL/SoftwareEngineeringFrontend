<template>
  <div class="page">
    <div class="card">
      <h2 class="title">Travel & Expense Reimbursement</h2>

      <div class="nav-buttons">
        <button class="nav-btn employee-btn" @click="goToTrips">
          My Trips
        </button>

        <button class="nav-btn manager-btn" @click="goToManagerTrips">
          Manage All Trips
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goToTrips() {
  router.push("/trips");
}

function goToManagerTrips() {
  router.push("/manager/trips");
}
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 500px;
  background: white;
  padding: 40px;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.nav-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.nav-btn {
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.employee-btn {
  background: #3b82f6;
  color: white;
}

.employee-btn:hover {
  background: #2563eb;
}

.manager-btn {
  background: #10b981;
  color: white;
}

.manager-btn:hover {
  background: #059669;
}
</style>
