<template>
  <app-input
    :type="type"
    :value="newValue"
    @input="$emit('update:valueAsNumber', convertedTime($event))"
    @change="$emit('update:valueAsDate', convertedDate($event.target.valueAsNumber))"
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

function getTime(date) {
  let timeFormatted = date.toISOString().split('.')[0].split('T')[1];
  return date.getSeconds() === 0 ? timeFormatted.slice(0, -3) : timeFormatted;
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
            return getTime(date);
          case 'datetime-local':
            return getDatetimeLocal(date);
          default:
            return getDate(date);
        }
      }
    },
  },

  methods: {
    convertedTime(date) {
      return new Date(date).getTime();
    },

    convertedDate(date) {
      return new Date(date).toISOString();
    },
  },
};
</script>

<style scoped></style>
