// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom


/* eslint-env jest */
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('react-owl-carousel2', () => {
  return function OwlCarousel(props) {
      return <div {...props}>Mock Owl Carousel</div>;
  };
});

global.scrollTo = jest.fn();

global.IntersectionObserver = class {
    constructor() {}
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();

  };

  window.IntersectionObserver = class {
    constructor() {}
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    scrollTo = jest.fn();
  };

  