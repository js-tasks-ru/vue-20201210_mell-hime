<template>
  <button
    :value="count"
    @click="$emit('increment', incrementCount)"
    type="button">{{ count }}</button>
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

  computed: {
    incrementCount() {
      return this.count + 1;
    },
  },

  model: {
    prop: 'count',
    event: 'click',
  },
};
</script>

<style></style>
