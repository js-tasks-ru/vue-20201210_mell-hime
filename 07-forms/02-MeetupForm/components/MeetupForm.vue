<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input v-model="localMeetup.title" class="form-control" />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input v-model="localMeetup.date" class="form-control" type="date" />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input v-model="localMeetup.place" class="form-control" />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea
            v-model="localMeetup.description"
            class="form-control"
            rows="3"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="localMeetup.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="(agendaItem, idx) in localMeetup.agenda"
        :key="agendaItem.id"
        @remove="removeAgendaItem(idx)"
        v-bind:agendaItem="agendaItem"
        v-on:update:agendaItem="localMeetup.agenda[idx] = $event"
        class="mb-3"
      />

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          data-test="cancel"
          @click="$emit('cancel')"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';

function buildAgendaItem() {
  return {
    id: Math.random(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
    },
  },

  data() {
    return {
      localMeetup: deepClone(this.meetup),
    };
  },

  methods: {
    addAgendaItem() {
      let newItem = buildAgendaItem();
      if (this.localMeetup.agenda.length > 0) {
        let newStartsAt = this.localMeetup.agenda.slice(-1)[0].endsAt;
        newItem = { ...newItem, startsAt: newStartsAt };
      }
      this.localMeetup.agenda.push(newItem);
    },

    removeAgendaItem(idx) {
      this.localMeetup.agenda.splice(idx, 1);
    },

    handleSubmit() {
      this.$emit('submit', deepClone(this.localMeetup));
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
