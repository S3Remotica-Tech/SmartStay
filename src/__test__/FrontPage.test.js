import { render } from "@testing-library/react";
import FrontPage from "../LandingPage/FrontPage";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; 
import { MemoryRouter } from 'react-router-dom';

// jest.mock('global')
describe('Checks for Front page', () => {

    beforeAll(() => {
        global.IntersectionObserver = jest.fn(() => ({
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        }));
      });

    const mockStore = configureStore()
      const store = mockStore({
        login: {
    
        }
      })

    it('it should checks for screen renders', () => {
        render(
        <Provider store={store}>
            <MemoryRouter>
                <FrontPage />
            </MemoryRouter>
            
        </Provider>
       )
    })
})