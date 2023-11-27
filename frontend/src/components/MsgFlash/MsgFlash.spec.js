import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MsgFlash from './index.vue';

describe('<MsgFlash />', () => {
  const wrapper = mount(MsgFlash);

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('asserts correct props are passed', () => {
    const wrapper = mount(MsgFlash, {
      props: {
        msg: 'mensagem de erro',
        msgClass: 'error',
      },
    });

    expect(wrapper.vm.msg).toBe('mensagem de erro');
    expect(wrapper.vm.msgClass).toBe('error');
  });

  it('not render if msg is null', () => {
    const wrapper = mount(MsgFlash);

    expect(wrapper.find('#msg').exists()).toBe(false);
  });

  it('should match rendered', () => {
    const wrapper = mount(MsgFlash, {
      props: {
        msg: 'mensagem de erro',
        msgClass: 'error',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
