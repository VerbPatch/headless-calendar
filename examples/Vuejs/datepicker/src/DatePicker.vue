<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useCalendar } from '@verbpatch/vuejs-calendar';

const props = defineProps<{
  label: string;
  modelValue?: Date;
  placeholder?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const calendar = useCalendar({
  calendarId: `datepicker-${props.label.replace(/\s+/g, '-').toLowerCase()}`,
  defaultView: 'month',
  defaultDate: props.modelValue || new Date(),
});

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

const handleDateSelect = (date: Date) => {
  emit('update:modelValue', date);
  isOpen.value = false;
};

const formatDateValue = (date?: Date) => {
  if (!date) return '';
  return calendar.value?.utils.formatDate(date, 'yyyy-MM-dd') || '';
};
</script>

<template>
  <div ref="containerRef" style="position: relative; margin-bottom: 20px">
    <label style="display: block">{{ label }}</label>
    <input
      type="text"
      readOnly
      :value="formatDateValue(modelValue)"
      :placeholder="placeholder || 'Select a date'"
      @click="isOpen = !isOpen"
    />

    <div
      v-if="isOpen"
      style="
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        background: white;
        border: 1px solid black;
      "
    >
      <div style="display: flex; justify-content: space-between">
        <button type="button" @click.stop="calendar?.goToPrevious">←</button>
        <span>{{ calendar?.utils.formatLocalizedMonth(calendar.currentDate) }}</span>
        <button type="button" @click.stop="calendar?.goToNext">→</button>
      </div>

      <table>
        <thead>
          <tr>
            <th v-for="(day, index) in calendar?.utils.daysofWeek('narrow')" :key="index">
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, i) in calendar?.monthData?.weeks" :key="i">
            <td
              v-for="(date, j) in week"
              :key="j"
              @click.stop="calendar?.monthData?.isCurrentMonth(date) && handleDateSelect(date)"
              :style="{
                cursor: calendar?.monthData?.isCurrentMonth(date) ? 'pointer' : 'default',
                color: calendar?.monthData?.isCurrentMonth(date)
                  ? modelValue && date.toDateString() === modelValue.toDateString()
                    ? 'blue'
                    : 'black'
                  : 'gray',
                fontWeight: calendar?.monthData?.isToday(date) ? 'bold' : 'normal',
                border:
                  modelValue && date.toDateString() === modelValue.toDateString()
                    ? '1px solid blue'
                    : 'none',
              }"
            >
              {{ date.getDate() }}
            </td>
          </tr>
        </tbody>
      </table>

      <div style="text-align: center">
        <button type="button" @click.stop="handleDateSelect(new Date())">Today</button>
      </div>
    </div>
  </div>
</template>
