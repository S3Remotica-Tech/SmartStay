/* eslint-env jest */
import { act } from 'react'
import { render, screen } from "@testing-library/react";
import FrontPage from "../LandingPage/FrontPage";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import CreateAccountPage from '../Components/CreateAccount';


// jest.mock('global')
// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useSelector: jest.fn(),
// }));

jest.mock('react-redux', () => {
  const ActualRedux = jest.requireActual('react-redux');
  return {
    ...ActualRedux,
    useSelector: jest.fn(),
  };
});
describe('Checks for Front page', () => {

  const event = userEvent.setup()
  const mockStore = configureStore()
  const store = mockStore({
    login: {

    }
  })

  it('it should checks for screen renders', async () => {

    act(() => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
            </Routes>
          </MemoryRouter>

        </Provider>
      )
    })

    expect(screen.getByTestId('home')).toBeInTheDocument()
    expect(screen.getByTestId('features')).toBeInTheDocument()
    expect(screen.getByTestId('pricing')).toBeInTheDocument()
    expect(screen.getByTestId('Testimonials')).toBeInTheDocument()
    const signUp = screen.getByTestId('signup')
    expect(signUp).toBeInTheDocument()

    event.click(signUp)
  })
})