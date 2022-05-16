//import { shallowMount } from '@vue/test-utils'
import { mount } from "@vue/test-utils";

import SbolErrors from "@/components/SbolErrors.vue";
import mocked_props from "./mockup_props/PropsListAnnotations"
import settings from "@/settings"

describe('SbolErrors.vue', () => {
    const title = settings.messages.error_page.title;
    const message = settings.messages.error_page.message;

    const _propsData = mocked_props.initial_state;


    const wrapper = mount(SbolErrors, {
        propsData: _propsData
    })


    it('title ?', () => {
        expect(wrapper.html()).toContain(title)
    })


    it('message ?', () => {
        expect(wrapper.html()).toContain(message)
    })


})
