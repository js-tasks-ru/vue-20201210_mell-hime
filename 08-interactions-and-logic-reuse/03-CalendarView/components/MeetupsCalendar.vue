<template>
  <calendar-view v-slot="{ monthDate }">
    <template v-for="meetup in meetupsOfDay[dateWoTime(monthDate)]">
      <router-link
        :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
        class="rangepicker__event"
        >{{ meetup.title }}</router-link
      >
    </template>
  </calendar-view>
</template>

<script>
import CalendarView from './CalendarView';

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    CalendarView,
  },

  computed: {
    meetupsOfDay() {
      let meetupsData = {};
      if (this.meetups) {
        this.meetups.forEach((meetup) => {
          let meetupDate = new Date(meetup.date).setHours(0, 0, 0, 0);
          if (meetupsData[meetupDate]) {
            meetupsData[meetupDate].push(meetup);
          } else {
            meetupsData[meetupDate] = [].concat(meetup);
          }
        });
      }
      return meetupsData;
    },
  },

  methods: {
    dateWoTime(monthDate) {
      return new Date(monthDate).setHours(0, 0, 0, 0);
    },
  },
};
</script>

<style scoped>
.rangepicker__event {
  --maxLines: 2;
  --lineHeight: 16px;
  --fontSize: 14px;

  display: block;

  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: var(--fontSize);
  line-height: var(--lineHeight);
  font-weight: 600;
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  text-decoration: none;
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .rangepicker__event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--maxLines) * var(--lineHeight) + 6px);
  }
}
</style>
