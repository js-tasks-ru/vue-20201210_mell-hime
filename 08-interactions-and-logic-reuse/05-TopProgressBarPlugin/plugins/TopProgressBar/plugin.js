import TopProgressBar from './index';
import TheTopProgressBar from './TheTopProgressBar';

export default {
  install(Vue, options) {
    let router = options.router;

    const container = document.createElement('div');
    document.body.appendChild(container);

    const TopProgressBarInstance = new Vue(TheTopProgressBar).$mount(container);

    TopProgressBar.setInstance(TopProgressBarInstance);

    if (router) {
      router.beforeEach(() => {
        TopProgressBar.start();
      });

      router.afterEach(() => {
        TopProgressBar.finish();
      });

      router.onError(() => {
        TopProgressBar.fail();
      });
    }

    Vue.prototype.$progress = TopProgressBar;
    Vue.$progress = TopProgressBar;
  },
};
