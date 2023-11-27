import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import router from '../../router';
import UserForm from './index.vue';

describe('<UserForm />', () => {
  const wrapper = mount(UserForm, {
    global: {
      plugins: [router],
    },
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('should match rendered', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
