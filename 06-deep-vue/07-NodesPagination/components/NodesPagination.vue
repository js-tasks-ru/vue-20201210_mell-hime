<script>
const chunk = function (array, size) {
  if (array === undefined || !array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);

  return [head, ...chunk(tail, size)];
};

export default {
  name: 'NodesPagination',

  props: {
    page: {
      type: Number,
    },
    perPage: {
      type: Number,
    },
  },

  render: function (createElement) {
    const data = chunk(this.$slots.default, this.perPage)[this.page - 1];

    return createElement('div', data);
  },
};
</script>

<style scoped></style>
