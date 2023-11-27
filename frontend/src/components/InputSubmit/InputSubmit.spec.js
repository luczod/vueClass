import { describe, expect, it } from 'vitest';
import Inputsubmit from './index.vue';
import { mount } from '@vue/test-utils';

describe('<InputSubmit />', () => {
  it('should be defined', () => {
    const wrapper = mount(Inputsubmit);
    expect(wrapper).toBeDefined();
  });

  it('asserts correct props are passed', () => {
    const wrapper = mount(Inputsubmit, {
      props: {
        msg: 'Cadastrar',
        blocked: false,
      },
    });

    expect(wrapper.vm.msg).toBe('Cadastrar');
    expect(wrapper.vm.blocked).toEqual(false);
  });

  it('should match rendered', () => {
    const wrapper = mount(Inputsubmit);
    expect(wrapper.element).toMatchSnapshot();
  });
});
