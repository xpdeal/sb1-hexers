<script setup lang="ts">
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="bg-[#0095ff] text-white h-14 flex items-center justify-between px-4">
    <div class="flex items-center">
      <button class="text-xl font-semibold">Início</button>
      <div class="ml-4 text-sm">
        <button class="hover:underline">Seu perfil</button>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center">
        <div class="bg-white rounded-full w-8 h-8 flex items-center justify-center">
          <span class="text-[#0095ff] text-sm">1</span>
        </div>
      </div>
      <button class="flex items-center gap-1">
        <QuestionMarkCircleIcon class="w-5 h-5" />
        <span>Ajuda</span>
      </button>
    </div>
  </div>
</template>