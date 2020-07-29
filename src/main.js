import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import SbolViewer from './views/Viewer';

const WrappedElement = wrap(Vue, SbolViewer);

window.customElements.define('sbol-viewer', WrappedElement);
