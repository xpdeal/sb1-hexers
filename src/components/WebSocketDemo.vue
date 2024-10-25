<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const messages = ref<string[]>([])
const newMessage = ref('')
const ws = ref<WebSocket | null>(null)
const channel = 'chat'

const connect = () => {
  ws.value = new WebSocket('ws://localhost:3000')

  ws.value.onopen = () => {
    messages.value.push('Connected to server')
    // Subscribe to channel
    ws.value?.send(JSON.stringify({
      action: 'subscribe',
      channel
    }))
  }

  ws.value.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.message) {
      messages.value.push(`${data.message}`)
    }
  }

  ws.value.onclose = () => {
    messages.value.push('Disconnected from server')
  }
}

const sendMessage = () => {
  if (newMessage.value.trim() && ws.value) {
    ws.value.send(JSON.stringify({
      action: 'publish',
      channel,
      message: newMessage.value
    }))
    newMessage.value = ''
  }
}

onMounted(() => {
  connect()
})

onUnmounted(() => {
  ws.value?.close()
})
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h2 class="text-xl font-bold mb-2">WebSocket Chat Demo</h2>
      <div class="bg-gray-100 p-4 rounded-lg h-64 overflow-y-auto">
        <div v-for="(message, index) in messages" :key="index" class="mb-2">
          {{ message }}
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type a message..."
          class="flex-1 px-3 py-2 border rounded-lg"
      />
      <button
          @click="sendMessage"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  </div>
</template>