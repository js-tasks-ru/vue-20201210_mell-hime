<template>
  <div
    class="progress"
    :style="{ width: width }"
    :class="{ show: showLine, failed: failLine }"
  ></div>
</template>

<script>
export default {
  name: 'TheTopProgressBar',

  data() {
    return {
      width: 0,
      showLine: false,
      failLine: false,
      state: '',
    };
  },

  methods: {
    start() {
      if (this.state === 'started') return;

      this.state = 'started';
      this.failLine = false;
      this.showLine = true;
      this.drawLine();
    },

    finish() {
      if (this.state === 'finished') return;

      this.showLine = false;
      this.state = 'finished';
    },

    fail() {
      if (this.state === 'failed') return;

      this.failLine = true;
      this.state = 'failed';
    },

    drawLine() {
      this.animate({
        duration: 3000,
        timing: (timeFraction) => {
          if (this.state === 'failed' || this.state === 'finished') return 1;

          return timeFraction;
        },
        draw: (progress) => {
          this.width = progress * 100 + '%';

          if (progress === 1) {
            this.finish();
          }
        },
      });
    },

    animate({ duration, draw, timing }) {
      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;

        if (timeFraction < 0) timeFraction = 0;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      });
    },
  },
};
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 0;
  opacity: 0;
  background-color: var(--blue);
  transition: opacity 0.2s linear 0.2s;
  z-index: 999999;
}

.progress.show {
  opacity: 1;
  transition: none;
}

.progress.failed {
  background-color: #db3851;
}
</style>
