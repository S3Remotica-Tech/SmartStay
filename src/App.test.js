import { render} from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; 

jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  Navigation: {},
  Pagination: {},
}));


beforeAll(() => {
  // Mock the scrollTo function to prevent the error
  global.scrollTo = jest.fn();

});


describe('checks for app.js', () => {
  it('renders learn react', () => {
  
  const mockStore = configureStore()
  const store = mockStore({
    login: {

    }
  })
  render(
    <Provider store={store}>
        <App />
    </Provider>
  );
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
})
})
