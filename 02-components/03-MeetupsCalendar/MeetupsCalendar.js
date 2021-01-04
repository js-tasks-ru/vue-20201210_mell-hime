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
  let daysInPreviousMonth = getDaysInMonth(previousMonth(date).getMonth(), date.getFullYear());
  let daysInNextMonth = getDaysInMonth(nextMonth(date).getMonth(), date.getFullYear());
  let daysInCurrentMonth = getDaysInMonth(date.getMonth(), date.getFullYear());
  let lastDaysInPreviousMonth = firstDay > 0 ? daysInPreviousMonth.slice(-firstDay) : (firstDay !== -1 ? [] : daysInPreviousMonth.slice(-6));
  let firstDaysInNextMonth = lastDay > 0 ? daysInNextMonth.slice(0, 7 - lastDay) : [];

  return [
    ...lastDaysInPreviousMonth,
    ...daysInCurrentMonth,
    ...firstDaysInNextMonth,
  ];
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
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
            :class="{ 'rangepicker__cell_inactive': inactiveCell(monthDate) }"
          >
            {{ monthDate.getDate() }}
            <template v-for="meetup in meetupsOfDay[dateWoTime(monthDate)]">
              <a class="rangepicker__event">{{ meetup.title }}</a>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      required: true,
      type: Array,
    },
  },

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

    meetupsOfDay() {
      let meetupsData = {};
      this.meetups.forEach((meetup) => {
        let meetupDate = new Date(meetup.date).setHours(0, 0, 0, 0);
        if (meetupsData[meetupDate]) {
          meetupsData[meetupDate].push(meetup);
        } else {
          meetupsData[meetupDate] = [].concat(meetup);
        }
      });

      return meetupsData;
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
    dateWoTime(monthDate) {
      return new Date(monthDate).setHours(0, 0, 0, 0)
    },
  },
};
