import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `
    <main id="app" class="main">
      <meetup-view :meetup="rawMeetup" />
    </main>`,

  components: { MeetupView },

  data() {
    return {
      rawMeetup: {}
    };
  },

  async mounted() {
    this.rawMeetup = await fetchMeetup(MEETUP_ID);
  },

  // methods
};
