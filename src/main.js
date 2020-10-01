import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import SbolViewer from './views/Viewer';

/*vue.config.errorhandler = (err, vm, info) => {

    console.log(`

        err ${err}
        vm ${vm}
        info ${info}

      `);
    // err: error trace
    // vm: component in which error occured
    // info: vue specific error information such as lifecycle hooks, events etc.
    // todo: perform any custom logic or log to server
};*/

var filter = function(text, length, clamp){
    clamp = clamp || '...';
    var node = document.createElement('div');
    node.innerHTML = text;
    var content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

const WrappedElement = wrap(Vue, SbolViewer);

window.customElements.define('sbol-viewer', WrappedElement);
