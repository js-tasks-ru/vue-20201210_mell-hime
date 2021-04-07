<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <form-group>
      <dropdown-button
        title="Тип"
        class="form-control"
        :options="$options.agendaItemTypes"
        v-model="localItem.type"
      />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <input
            class="form-control"
            v-model="localItem.startsAt"
            type="time"
            placeholder="00:00"
          />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <input
            class="form-control"
            v-model="localItem.endsAt"
            type="time"
            placeholder="00:00"
          />
        </form-group>
      </div>
    </div>

    <form-group
      :label="item.title"
      v-for="item in $options.fieldSpecifications[localItem.type]"
      :key="item.field"
    >
      <component
        :class="{ 'form-control': item.component === 'dropdown-button' }"
        :is="item.component"
        v-bind="item.props"
        :[item.model.prop]="$data['localItem'][item.field]"
        @[item.model.event]="$data['localItem'][item.field] = $event"
      >
      </component>
    </form-group>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton, FormGroup },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localItem: {
        ...this.agendaItem,
      },
      hoursDiff: 0,
    };
  },

  created() {
    this.setNewDiff();
  },

  watch: {
    localItem: {
      deep: true,
      handler: function (newVal) {
        this.$emit('update:agendaItem', { ...newVal });
      },
    },

    'localItem.endsAt': function () {
      this.setNewDiff();
    },

    'localItem.startsAt': function (newVal, oldVal) {
      if (!(this.localItem.endsAt === '00:00' && oldVal === '00:00')) {
        let startsAtDt = new Date(
          '1970-01-01T' + this.localItem.startsAt + ':00Z',
        );
        startsAtDt.setHours(startsAtDt.getHours() + this.hoursDiff);
        this.localItem.endsAt = startsAtDt.toISOString().slice(11, 16);
      }
    },
  },

  methods: {
    setNewDiff() {
      let startsAtDt = new Date(
        '1970-01-01T' + this.localItem.startsAt + ':00Z',
      );
      let endsAtDt = new Date('1970-01-01T' + this.localItem.endsAt + ':00Z');

      this.hoursDiff =
        (endsAtDt.getTime() - startsAtDt.getTime()) / (1000 * 3600);
    },
  },
};
</script>

<style></style>
