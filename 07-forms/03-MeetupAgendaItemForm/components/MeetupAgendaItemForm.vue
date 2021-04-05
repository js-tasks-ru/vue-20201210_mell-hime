<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select v-model="localItem.type" class="form-control" title="Тип">
        <option
          v-for="option in typeOptions"
          :value="option.value"
          :key="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            v-model="localItem.startsAt"
            type="time"
            placeholder="00:00"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            v-model="localItem.endsAt"
            type="time"
            placeholder="00:00"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">{{ title }}</label>
      <input class="form-control" v-model="localItem.title" />
    </div>
    <div class="form-group" v-if="localItem.type === 'talk'">
      <label class="form-label">Докладчик</label>
      <input class="form-control" v-model="localItem.speaker" />
    </div>
    <div
      class="form-group"
      v-if="localItem.type === 'talk' || localItem.type === 'other'"
    >
      <label class="form-label">Описание</label>
      <textarea class="form-control" v-model="localItem.description"></textarea>
    </div>
    <div class="form-group" v-if="localItem.type === 'talk'">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="localItem.language">
        <option
          v-for="option in languageOptions"
          :value="option.value"
          :key="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

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

  computed: {
    typeOptions() {
      return getAgendaItemTypes();
    },

    languageOptions() {
      return getTalkLanguages();
    },

    title() {
      switch (this.localItem.type) {
        case 'talk':
          return 'Тема';
        case 'other':
          return 'Заголовок';
        default:
          return 'Нестандартный текст (необязательно)';
      }
    },
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
