import { shallowMount } from '@vue/test-utils'

import SbolHeader from "../../src/components/SbolHeader.vue";

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
