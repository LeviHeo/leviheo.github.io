import '../css/style.scss';

function importAll(r) {
  return r.keys().map(r);
}
importAll(require.context('../img', false, /\.(png|jpe?g|svg)$/));

import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
