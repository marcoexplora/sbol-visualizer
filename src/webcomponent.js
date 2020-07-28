// vue build --target wc --name sbol-visualizer  ./src/webcomponent.js
// vue build  --target wc --name sbol-viewer ./src/views/Viewer.vue
import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import VueWebComponent from './views/Viewer';

const CustomElement = wrap(Vue, VueWebComponent);

window.customElements.define('sbol-visualizer', CustomElement);