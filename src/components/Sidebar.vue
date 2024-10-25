<script setup lang="ts">
import { 
  HomeIcon, 
  CreditCardIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  ArrowPathIcon,
  BanknotesIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const menuItems = [
  { name: 'Início', icon: HomeIcon },
  { name: 'Seu dinheiro', icon: CreditCardIcon },
  { name: 'Atividade', icon: ClockIcon },
  { name: 'Open Finance', icon: ArrowPathIcon },
  { name: 'Transferir dinheiro', icon: BanknotesIcon },
  { name: 'Boleto', icon: DocumentDuplicateIcon },
  { name: 'Link de pagamento', icon: QrCodeIcon },
  { name: 'Relatórios e faturamento', icon: ChartBarIcon },
  { name: 'Planos de assinatura', icon: DocumentTextIcon },
  { name: 'Cobrar na sua loja', icon: BuildingStorefrontIcon },
  { name: 'Seu negócio', icon: UserGroupIcon }
]
</script>

<template>
  <div class="w-64 bg-white h-[calc(100vh-3.5rem)] border-r overflow-y-auto">
    <div class="p-4">
      <nav>
        <ul class="space-y-1">
          <li v-for="item in menuItems" :key="item.name">
            <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
              <component :is="item.icon" class="w-5 h-5 mr-3" />
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="absolute bottom-0 w-64 p-4 border-t bg-white">
      <a href="#" class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm">
        <ArrowRightOnRectangleIcon class="w-5 h-5 mr-3" />
        Encerrar sessão
      </a>
    </div>
  </div>
</template>