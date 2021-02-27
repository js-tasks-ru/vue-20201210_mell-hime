<template>
  <app-input
    :type="type"
    :value="newValue"
    @input.native="$emit('update:valueAsNumber', convertToNumber($event.target.valueAsNumber))"
    @change="$emit('update:valueAsDate', convertToDate($event.target.valueAsNumber))"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </app-input>
</template>

<script>
import AppInput from './AppInput';

function getDate(date) {
  return date.toISOString().split('T')[0];
}

function getTime(date, step) {
  let timeFormatted = date.toISOString().split('.')[0].split('T')[1];
  return step % 60 > 0 ? timeFormatted : timeFormatted.slice(0, -3)
}

function getDatetimeLocal(date) {
  return date.toISOString().split('.')[0];
}

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: function (value) {
        return ['date', 'time', 'datetime-local'].includes(value);
      },
    },
    valueAsNumber: {
      type: Number,
    },
    valueAsDate: {
      type: Date,
    },
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
  },

  computed: {
    newValue() {
      if (!this.valueAsNumber && !this.valueAsDate) {
        return this.value;
      } else {
        let date = this.valueAsNumber ? new Date(this.valueAsNumber) : this.valueAsDate

        switch (this.type) {
          case 'time':
            return getTime(date, this.$attrs.step);
          case 'datetime-local':
            return getDatetimeLocal(date);
          default:
            return getDate(date);
        }
      }
    },
  },

  methods: {
    convertToNumber(date) {
      if (this.type === 'date') {
        return new Date(new Date(date).toUTCString()).getTime();
      } else if (this.type === 'datetime-local') {
        return date;
      }
    },

    convertToDate(date) {
      return new Date(new Date(date).toISOString());
    },
  },
};
</script>

<style scoped></style>
