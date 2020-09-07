// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })


import { shallowMount } from '@vue/test-utils'

import SbolLogo from '@/components/SbolLogo.vue'
import SbolHeader from "@/components/SbolHeader.vue";
import SbolListAnnotations from "@/components/SbolListAnnotations.vue";
import SbolChart from "@/components/SbolChart.vue";
import SbolDetail from "@/components/SbolDetail.vue";


describe('SbolHeader.vue', () => {
  it('Is Header component working?', () => {

    const _header = {
      partID: 'part_id',
      name: 'name',
      alternativeName: 'alternativeName',
      version: 'version',
      division: 'division',
      parentSequence: 'parentSequence'
    }

    const wrapper = shallowMount(SbolHeader, {
      propsData: {
        header: _header
      }
    })
    expect(wrapper.html()).toContain('class="heading"')
  })
})

describe('SbolLogo.vue', () => {
  it('Is SVG SBol LOGO working?', () => {

    const wrapper = shallowMount(SbolLogo, {
      propsData: {}
    })

    expect(wrapper.html()).toContain('div id="sbolLogo"')
  })
})
