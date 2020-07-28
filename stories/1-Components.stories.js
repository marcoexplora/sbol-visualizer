import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import SbolViewer from '../src/views/Viewer'

export default {
  title: 'Components',
};



export const empty = () => ({
  data() {
    return {
      annotations: [
     
      ],
      annotation: {}
    }
  },
  components: { "SbolViewer": SbolViewer },
  template: `
    <div>
    <SbolViewer ref="sbolwidget" width="300px"/>
    </div>
  `,
  methods: {  },
});


export const simple = () => ({
  data() {
    return {
      annotations: [
        {"pk":22354,"start":195,"end":219,"direction":1,"name":"F24 primer bind","notes":"","role_id":29}, //primer oligos
        {"pk":31032,"start":226,"end":259,"direction":1,"name":"lacZa*_18_interval_1","notes":"","role_id":37}, //Gene
        {"pk":31034,"start":259,"end":306,"direction":1,"name":"MIIs B2 (accc)","notes":"","role_id":27}, //Misc.feature/Other/Unknown
        {"pk":31036,"start":361,"end":652,"direction":1,"name":"lacZa*_18_interval_2","notes":"","role_id":37}, //Gene
        {"pk":31037,"start":613,"end":616,"direction":1,"name":"Premature STOP","notes":"","role_id":14}, //STOP Codon
        {"pk":31038,"start":422,"end":446,"direction":2,"name":"R24 primer bind","notes":"","role_id":29},  //primer oligos
        {"pk":31039,"start":312,"end":361,"direction":1,"name":"MIIs C1 (gcga)","notes":"Insertion","role_id":27} //Misc.feature/Other/Unknown
      ],
      annotation: {}
    }
  },
  components: { "SbolViewer": SbolViewer },
  template: `1  a<SbolViewer :source="source"/>`
});

