export default {
  // Экземпляр компонента TopProgressBar. Может быть вне объекта.
  instance: null,

  // Можно добавить метод сохранения экземпляра
  setInstance(instance) {
    this.instance = instance;
  },

  // Метод запуска прогресса
  start() {
    // Взаимодействует с экземпляром компонента
    // (не забывайте о проверках на наличие экземпляра)
    if (this.instance) {
      this.instance.start();
    }
  },

  finish() {
    if (this.instance) {
      this.instance.finish();
    }
  },

  fail() {
    if (this.instance) {
      this.instance.fail();
    }
  },
};
