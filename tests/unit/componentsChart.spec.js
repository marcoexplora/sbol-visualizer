import { shallowMount } from '@vue/test-utils'

import SbolChart from "@/components/SbolChart.vue";

import mocked_props from "./mockup_props/PropsListAnnotations"

describe('SbolChart.vue', () => {

  const _propsData = mocked_props.initial_state;
  _propsData.breadcrumbs = mocked_props.tree_open.breadcrumbs;
  _propsData.selected = mocked_props.tree_open.selected;
  _propsData.flavourMini = false;
  _propsData.graphwidth = 1224;
  _propsData.wcid = 123;


  const wrapper = shallowMount(SbolChart, {
    propsData: _propsData
  })


  it('Chart: Glyph SBOL ?', () => {
    expect(wrapper.html()).toContain('SO:0000804')
  })


  it('Chart: url ?', () => {
    expect(wrapper.html()).toContain('/sbolglyph/SO_0000804.svg')
  })


})
