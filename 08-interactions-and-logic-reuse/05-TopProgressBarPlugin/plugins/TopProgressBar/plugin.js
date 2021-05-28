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
      router.beforeEach((to, from, next) => {
        TopProgressBar.start();
        next();
      });

      router.afterEach(() => {
        TopProgressBar.finish();
      });

      router.onError((err) => {
        TopProgressBar.fail();
        throw err;
      });
    }

    Vue.prototype.$progress = TopProgressBar;
    Vue.$progress = TopProgressBar;
  },
};
