<template>
  <div class="container">
    <meetups-view v-bind.sync="$data" />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  data() {
    return {
      search: this.$route.query.search,
      date: this.$route.query.date,
      participation: this.$route.query.participation,
      view: this.$route.query.view,
    };
  },

  computed: {
    updatedQuery: {
      get: function () {
        return this.search;
      },
      set: function (query) {
        this.search = query.search;
        this.date = query.date;
        this.participation = query.participation;
        this.view = query.view;
      },
    },
  },

  watch: {
    $route(to, from) {
      this.updatedQuery = to.query;
    },
    search: function (oldValue, newValue) {
      this.$router.replace({ path: '/', query: { search: newValue } });
    },
  },
};
</script>

<style scoped></style>
