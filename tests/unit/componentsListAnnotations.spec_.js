import { shallowMount } from '@vue/test-utils'

import SbolListAnnotations from "@/components/SbolListAnnotations.vue";
import SbolTreeList from "@/components/SbolTreeList.vue"

import mocked_props from "./mockup_props/PropsListAnnotations"

describe('SbolListAnnotations.vue - tree closed', () => {

  const wrapper = shallowMount(SbolListAnnotations, {
    propsData: mocked_props.initial_state
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