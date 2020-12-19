import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `
    <main id="app" class="main">
      <meetup-view v-if="rawMeetup" :meetup="rawMeetup" />
    </main>`,

  components: { MeetupView },

  data() {
    return {
      rawMeetup: null,
    };
  },

  async mounted() {
    this.rawMeetup = await fetchMeetup(MEETUP_ID);
  }
};
