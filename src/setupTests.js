// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

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
  };

  export class IntersectionObserver {
    root = null;
    rootMargin = "";
    thresholds = [];
   
    disconnect() {
      return null;
    }
   
    observe() {
      return null;
    }
   
    takeRecords() {
      return [];
    }
   
    unobserve() {
      return null;
    }
  }
  window.IntersectionObserver = IntersectionObserver;
  global.IntersectionObserver = IntersectionObserver;