<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Dashboard from './components/Dashboard.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <div class="flex">
      <Sidebar />
      <Dashboard />
    </div>
  </div>
</template>

<style>
#app {
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>