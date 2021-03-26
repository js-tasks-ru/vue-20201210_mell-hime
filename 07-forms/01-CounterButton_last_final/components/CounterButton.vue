<template>
  <button @click="$emit('increment', (incrementedCount += 1))">
    {{ incrementedCount }}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      incrementedCount: this.count,
    };
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  watch: {
    count: function (newVal) {
      this.incrementedCount = newVal;
    },
  },
};
</script>

<style></style>
