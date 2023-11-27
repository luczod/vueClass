import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import router from '../../router';
import NavBar from './index.vue';

describe('<NavBar />', () => {
  const wrapper = mount(NavBar, {
    global: {
      plugins: [router],
    },
  });

  it('should be defined', () => {
    expect(wrapper).toBeDefined();
  });

  it('link to view homePage', async () => {
    const push = vi.spyOn(router, 'push');
    await wrapper.find('a[href="/"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/');
  });

  it('link to view About', async () => {
    const push = vi.spyOn(router, 'push');
    await wrapper.find('a[href="/about"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/about');
  });

  it('link to view Register', async () => {
    const push = vi.spyOn(router, 'push');
    await wrapper.find('a[href="/register"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/register');
  });

  it('should match rendered', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
