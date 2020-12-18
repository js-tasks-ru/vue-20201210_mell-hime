const getDateOnlyString = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
};

export const MeetupInfo = {
  template: `<ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="dateOnlyString">{{ localDate }}</time>
      </li>
    </ul>`,

  props: {
    organizer: {
      required: true,
      type: String
    },
    place: {
      required: true,
      type: String
    },
    date: {
      required: true,
      type: Date
    }
  },

  computed: {
    dateOnlyString() {
      return getDateOnlyString(this.date)
    },
    localDate() {
      return this.date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
};
