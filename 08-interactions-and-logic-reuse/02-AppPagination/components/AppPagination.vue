<template>
  <div>
    <template v-for="item in paginatedItems">
      <slot :item="item">
        <span>{{ item }}</span>
      </slot>
    </template>
  </div>
</template>

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
  name: 'AppPagination',
  props: {
    page: Number,
    perPage: Number,
    items: Array,
  },

  computed: {
    paginatedItems() {
      return chunk(this.items, this.perPage)[this.page - 1];
    },
  },
};
</script>

<style></style>
