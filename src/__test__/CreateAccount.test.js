/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import CreateAccountPage from "../Components/CreateAccount";
import configureStore from 'redux-mock-store';
import { Provider, useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'

jest.mock('react-redux', () => {
  const ActualRedux = jest.requireActual('react-redux');
  return {
    ...ActualRedux,
    useSelector: jest.fn(),
  };
});

describe('checking for create account', () => {
    const event = userEvent.setup()
    const mockStore = configureStore()
    const store = mockStore({
    })

   beforeEach(() => {
  useSelector.mockImplementation(() => ({
    createAccount: {
      statusCodeCreateAccount: 100,
    },
  }));
});

    

    it('it should checks for UI renders and register', async () => {

        render(<Provider store={store}>
            <MemoryRouter>
                <CreateAccountPage />
            </MemoryRouter>

        </Provider>)

        const fname = screen.getByTestId('first-name')
        expect(fname).toBeInTheDocument()
        const lname = screen.getByTestId('last-name')
        expect(lname).toBeInTheDocument()
        const email = screen.getByTestId('emailid')
        expect(email).toBeInTheDocument()
        const mobile = screen.getByTestId('mobile')
        expect(mobile).toBeInTheDocument()
        const password = screen.getByTestId('password')
        expect(password).toBeInTheDocument()
        const cPassword = screen.getByTestId('confirm-password')
        expect(cPassword).toBeInTheDocument()
        const createAccount = screen.getByTestId('create-account-btn')
        expect(createAccount).toBeInTheDocument()

        await event.type(fname, "Cleetus")
        // await event.type(lname, "")
        await event.type(mobile, "9876543210")
        await event.type(email, "cleetus@gmail.com")
        await event.type(password, "qwer@1234")
        await event.type(cPassword, "qwer@1234")

        // await expect(lname).toHaveValue("")
        await expect(fname).toHaveValue("Cleetus")
        await expect(mobile).toHaveValue("9876543210")
        await expect(email).toHaveValue("cleetus@gmail.com")
        await expect(password).toHaveValue("qwer@1234")
        await expect(cPassword).toHaveValue("qwer@1234")

        await event.click(createAccount)

        await jest.mocked(useSelector).mockImplementation(() => ({
            createAccount: {
                statusCodeCreateAccount: 200
            }
        }))

    })

    it('it should through error on all fields', async () => {
        
        render(<Provider store={store}>
            <MemoryRouter>
                <CreateAccountPage />
            </MemoryRouter>

        </Provider>)

        const fname = screen.getByTestId('first-name')
        expect(fname).toBeInTheDocument()
        const lname = screen.getByTestId('last-name')
        expect(lname).toBeInTheDocument()
        const email = screen.getByTestId('emailid')
        expect(email).toBeInTheDocument()
        const mobile = screen.getByTestId('mobile')
        expect(mobile).toBeInTheDocument()
        const password = screen.getByTestId('password')
        expect(password).toBeInTheDocument()
        const cPassword = screen.getByTestId('confirm-password')
        expect(cPassword).toBeInTheDocument()
        const createAccount = screen.getByTestId('create-account-btn')
        expect(createAccount).toBeInTheDocument()
        // password-error

        await event.type(fname, "Cleetus")
        await event.type(lname, "Roblex")
        await event.type(mobile, "9876543210")
        await event.type(email, "cleetus@gmail.com")
        await event.type(password, "qwer@1234")
        await event.type(cPassword, "qwer@12345")
        await event.click(createAccount)

        const passwordError = await screen.getByTestId('password-error-container')
        await expect(passwordError).toBeInTheDocument()
    })

    it('it should verify the first name with empty values', async () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <CreateAccountPage />
            </MemoryRouter>

        </Provider>)

        const fname = screen.getByTestId('first-name')
        expect(fname).toBeInTheDocument()
        const createAccount = await screen.getByTestId('create-account-btn')
        expect(createAccount).toBeInTheDocument()
        await event.click(createAccount)
        expect(await screen.getByTestId('fname-container').children.length).toBe(2)
        await event.type(fname, 'Seles')
        expect(await screen.getByTestId('fname-container').children.length).toBe(1)

    })

    it('it should verify the first name with no values', async () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <CreateAccountPage />
            </MemoryRouter>

        </Provider>)

        const fname = screen.getByTestId('first-name')
        expect(fname).toBeInTheDocument()
        const createAccount = await screen.getByTestId('create-account-btn')
        expect(createAccount).toBeInTheDocument()
        await event.click(createAccount)
        expect(await screen.getByTestId('fname-container').children.length).toBe(2)
        await event.type(fname, 'Seles')
        expect(await screen.getByTestId('fname-container').children.length).toBe(1)

    })
})