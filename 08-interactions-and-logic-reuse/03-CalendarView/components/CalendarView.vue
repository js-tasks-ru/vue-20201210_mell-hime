<template>
  <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button @click="previousMonth" class="rangepicker__selector-control-left"></button>
          <div>{{ currentDate }}</div>
          <button @click="nextMonth" class="rangepicker__selector-control-right"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <template v-for="monthDate in datesList">
          <div
            class="rangepicker__cell"
            :class="{ rangepicker__cell_inactive: inactiveCell(monthDate) }"
          >
            {{ monthDate.getDate() }}
            <slot :monthDate="monthDate"></slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
function getDaysInMonth(month, year) {
  let date = new Date(year, month, 1);
  let days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function nextMonth(date) {
  if (date.getMonth() === 11) {
    return new Date(date.getFullYear() + 1, 0, 1);
  } else {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
}

function previousMonth(date) {
  if (date.getMonth() === 0) {
    return new Date(date.getFullYear() - 1, 11, 1);
  } else {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
}

function datesInMonth(date) {
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  let daysInPreviousMonth = getDaysInMonth(
    previousMonth(date).getMonth(),
    date.getFullYear(),
  );
  let daysInNextMonth = getDaysInMonth(
    nextMonth(date).getMonth(),
    date.getFullYear(),
  );
  let daysInCurrentMonth = getDaysInMonth(date.getMonth(), date.getFullYear());
  let lastDaysInPreviousMonth =
    firstDay > 0
      ? daysInPreviousMonth.slice(-firstDay)
      : firstDay !== -1
      ? []
      : daysInPreviousMonth.slice(-6);
  let firstDaysInNextMonth =
    lastDay > 0 ? daysInNextMonth.slice(0, 7 - lastDay) : [];

  return [
    ...lastDaysInPreviousMonth,
    ...daysInCurrentMonth,
    ...firstDaysInNextMonth,
  ];
}

export default {
  name: 'CalendarView',

  data() {
    return {
      date: new Date(),
    };
  },

  computed: {
    currentDate() {
      return this.date.toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
      });
    },

    datesList() {
      return datesInMonth(new Date(this.date));
    },

    currentMonth() {
      return this.date.getMonth();
    },
  },

  methods: {
    nextMonth() {
      this.date = nextMonth(this.date);
    },
    previousMonth() {
      this.date = previousMonth(this.date);
    },
    inactiveCell(monthDate) {
      return monthDate.getMonth() !== this.currentMonth;
    },
  },
};
</script>

<style scoped>
.rangepicker {
  position: relative;
  margin: 32px 0 0;
}

.rangepicker__selector {
  display: flex;
  background-color: var(--white);
  flex-direction: row;
  justify-content: space-between;
  flex: 1 0 100%;
}

.rangepicker__calendar {
  flex-grow: 1;
}

.rangepicker__month-indicator {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.rangepicker__selector-controls {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}
.rangepicker__selector-controls button {
  border: none;
  padding: 0;
}

.rangepicker__selector-control-left,
.rangepicker__selector-control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('../assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.rangepicker__selector-control-left:hover,
.rangepicker__selector-control-right:hover {
  opacity: 0.8;
}

.rangepicker__selector-control-right {
  transform: rotate(180deg);
}

.rangepicker__date-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

/* Dates */
.rangepicker__date-grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.rangepicker__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.rangepicker__cell.rangepicker__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .rangepicker__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .rangepicker__date-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .rangepicker__cell {
    height: 144px;
  }

  .rangepicker__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
