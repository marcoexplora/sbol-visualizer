import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import SbolViewer from './views/Viewer';

Vue.config.errorhandler = (err, vm, info) => {

    console.log(`

        err ${err}
        vm ${vm}
        info ${info}

      `);
    // err: error trace
    // vm: component in which error occured
    // info: vue specific error information such as lifecycle hooks, events etc.
    // todo: perform any custom logic or log to server
};


const WrappedElement = wrap(Vue, SbolViewer);

window.customElements.define('sbol-viewer', WrappedElement);
