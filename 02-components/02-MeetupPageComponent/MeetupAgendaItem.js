import {agendaItemIcons, agendaItemTitles} from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="icon" />
      </div>
      <div class="meetup-agenda__item-col">{{ timeline }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ title }}</h5>
        <template v-if="agendaItem.type === 'talk'">
          <p>
            <span>{{ agendaItem.speaker }}</span>
            <span class="meetup-agenda__dot"></span>
            <span class="meetup-agenda__lang">{{ agendaItem.language }}</span>
          </p>
          <p>{{ agendaItem.description }}</p>
        </template>
      </div>
    </div>`,

  props: {
    agendaItem: {
      required: true,
      type: Object
    }
  },

  computed: {
    icon() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`
    },
    title() {
      return this.agendaItem.title || agendaItemTitles[this.agendaItem.type]
    },
    timeline() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`
    }
  }
};
