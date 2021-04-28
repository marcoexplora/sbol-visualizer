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

import SbolHeader from "@/components/SbolHeader.vue";
import SbolListAnnotations from "@/components/SbolListAnnotations.vue";
import SbolTreeList from "@/components/SbolTreeList.vue"
import SbolChart from "@/components/SbolChart.vue";
import SbolDetail from "@/components/SbolDetail.vue";

import mocked_props from "./mockup_props/PropsListAnnotations"

describe('SbolHeader.vue', () => {

  const _header = {
    partID: '$part_id$',
    name: 'name',
    alternativeName: 'alternativeName',
    version: '$version$',
    division: 'division',
    parentSequence: 'parentSequence',
    mutableDescription : '$mutableDescription$',
    creator : '$creator$'
  }
  const wrapper = shallowMount(SbolHeader, {
    propsData: {
      header: _header
    }
  })

  it('Header: Is Header component working?', () => {
    expect(wrapper.html()).toContain('class="mutableDescription')
  })

  it('Header: Show version?', () => {
    expect(wrapper.html()).toContain('$version$')
  })


  it('Header: Show part id?', () => {
    expect(wrapper.html()).toContain('$part_id$')
  })


  it('Header: Show mutableDescription?', () => {
    expect(wrapper.html()).toContain('$mutableDescription$')
  })


  it('Header: Show creator?', () => {
    expect(wrapper.html()).toContain('$creator$')
  })

})

describe('SbolListAnnotations.vue - tree closed', () => {

  const wrapper = shallowMount(SbolListAnnotations, {
    propsData: mocked_props.initial_state
  })

  console.log(wrapper.html())

  it('SbolListAnnotations: Show Search ?', () => {
    expect(wrapper.html()).toContain('class="search-input"')
  })

  it('SbolListAnnotations: Show SbolTreeList ?', () => {
    expect(wrapper.findAllComponents(SbolTreeList).at(0).html()).toContain('item=')
  })

  it('SbolListAnnotations: Show SbolTreeList (two components) ?', () => {
    expect(wrapper.findAllComponents(SbolTreeList).at(1).html()).toContain('item=')
  })

});



describe('SbolListAnnotations.vue - tree explored', () => {
  const _propsData = mocked_props.initial_state;
  _propsData.breadcrumbs = mocked_props.tree_open.breadcrumbs;
  _propsData.selected = mocked_props.tree_open.selected;

  const wrapper = shallowMount(SbolListAnnotations, {
    propsData: _propsData
  })

  it('SbolListAnnotations: Show Search ?', () => {
    expect(wrapper.html()).toContain('class="search-input"')
  })

  it('SbolListAnnotations: Show SbolTreeList ?', () => {
    expect(wrapper.findAllComponents(SbolTreeList).at(0).html()).toContain('item=')
  })

  it('SbolListAnnotations: Show SbolTreeList (two components) ?', () => {
    expect(wrapper.findAllComponents(SbolTreeList).at(1).html()).toContain('item=')
  })

});