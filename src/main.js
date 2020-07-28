/*import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')*/

import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import MyWebComponent from './views/Viewer';

const WrappedElement = wrap(Vue, MyWebComponent);

window.customElements.define('sbol-viewer', WrappedElement);
