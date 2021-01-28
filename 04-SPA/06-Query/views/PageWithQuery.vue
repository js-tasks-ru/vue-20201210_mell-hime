<template>
  <div class="container">
    <meetups-view v-bind.sync="pageAttrs" />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  data() {
    return {
      pageAttrs: {
        search: this.$route.query.search,
        date: this.$route.query.date,
        participation: this.$route.query.participation,
        view: this.$route.query.view,
      },
    };
  },

  computed: {
    updatedQuery: {
      get: function () {
        return null;
      },
      set: function (query) {
        this.pageAttrs.search = query.search;
        this.pageAttrs.date = query.date;
        this.pageAttrs.participation = query.participation;
        this.pageAttrs.view = query.view;
      },
    },
  },

  watch: {
    $route(to) {
      this.updatedQuery = to.query;
    },
    pageAttrs: {
      deep: true,
      handler() {
        let newDate = this.pageAttrs.date === 'all' ? undefined : this.pageAttrs.date
        let newSearch = this.pageAttrs.search === '' ? undefined : this.pageAttrs.search
        let newView = this.pageAttrs.view === 'list' ? undefined : this.pageAttrs.view
        let newParticipation = this.pageAttrs.participation === 'all' ? undefined : this.pageAttrs.participation
        this.$router
          .replace({
            query: {
              date: newDate,
              search: newSearch,
              view: newView,
              participation: newParticipation,
            },
          })
          .catch((error) => {
            if (error.name === 'NavigationDuplicated') {
              return this.currentRoute;
            } else {
              throw error;
            }
          });
      },
    },
  },
};
</script>

<style scoped></style>
