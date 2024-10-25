<script setup lang="ts">
import { ref } from 'vue'
import { EyeIcon } from '@heroicons/vue/24/outline'

const balance = ref(0.92)
const activities = [
  { name: 'Selviro Gonçalves Santos Filho', type: 'Pagamento com Pix', amount: -10.00, date: '23/out' },
  { name: 'J A A Comercio De Produtos Alimenticios Ltda', type: 'Pagamento com Pix', amount: -25.18, date: '23/out' },
  { name: 'Senador Comercial Ltda', type: 'Pagamento com Pix', amount: -32.98, date: '23/out' },
]
</script>

<template>
  <div class="flex-1 p-8">
    <div class="bg-white rounded-lg p-6 mb-6 shadow-sm">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium">Dinheiro disponível</h2>
        <button class="text-[#0095ff]">Os seus dados</button>
      </div>
      <div class="mb-4">
        <div class="flex items-center gap-2">
          <span class="text-3xl font-bold">R$ {{ balance.toFixed(2) }}</span>
          <button class="text-gray-600">
            <EyeIcon class="w-5 h-5" />
          </button>
        </div>
        <p class="text-sm text-gray-500">R$ 0,00 a liberar</p>
      </div>
      <div class="flex gap-4">
        <button class="bg-[#0095ff] text-white px-4 py-2 rounded-lg text-sm">Depositar dinheiro</button>
        <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">Transferir dinheiro</button>
      </div>
    </div>

    <div class="bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-lg font-medium mb-4">Sua última atividade</h2>
      <div class="space-y-4">
        <div v-for="activity in activities" :key="activity.name" class="flex items-center justify-between py-2 border-b">
          <div class="flex items-center gap-4">
            <div class="bg-gray-100 p-2 rounded">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p class="font-medium text-sm">{{ activity.name }}</p>
              <p class="text-sm text-gray-500">{{ activity.type }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-medium text-sm" :class="activity.amount < 0 ? 'text-red-500' : 'text-green-500'">
              {{ activity.amount < 0 ? '-' : '+' }} R$ {{ Math.abs(activity.amount).toFixed(2) }}
            </p>
            <p class="text-sm text-gray-500">{{ activity.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>