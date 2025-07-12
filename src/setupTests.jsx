/* eslint-env vitest */
import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest'; 


vi.mock('react-owl-carousel2', () => {
  return {
    default: (props) => <div {...props}>Mock Owl Carousel</div>,
  };
});

global.scrollTo = vi.fn();


class IntersectionObserverMock {
  constructor() {}
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

global.IntersectionObserver = IntersectionObserverMock;
window.IntersectionObserver = IntersectionObserverMock;
