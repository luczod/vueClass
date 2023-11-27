import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import FooterFn from './index.vue';

describe('<FooterFn />', () => {
  it('should be defined', () => {
    const wrapper = mount(FooterFn);
    expect(wrapper).toBeDefined();
  });

  it('should match rendered', () => {
    const wrapper = mount(FooterFn);
    expect(wrapper.element).toMatchSnapshot();
  });
});
