import { describe, expect } from "vitest";
import CreateAccountPage from "../../Components/CreateAccount";
import { getByTestId, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'

describe('test cases for create account', () => {
    const event = userEvent.setup()
    const mockStore = configureStore()
    const store = mockStore({
        createAccount: {
            statusCodeCreateAccount: 200
        }
    })

    it('checks for basic renders', () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <CreateAccountPage />
            </MemoryRouter>
        </Provider>)

        expect(screen.getByTestId("create-account")).toBeInTheDocument()
    })

    it('check for  Ui with register', async () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <CreateAccountPage />
            </MemoryRouter>
        </Provider>)

        const fName = screen.getByTestId('first-name')
        expect(fName).toBeInTheDocument()
        const lName = screen.getByTestId('last-name')
        expect(lName).toBeInTheDocument()
        const emailID = screen.getByTestId('emailid')
        expect(emailID).toBeInTheDocument()
        const mobile = screen.getByTestId('mobile')
        expect(mobile).toBeInTheDocument()
        const password = screen.getByTestId('password')
        expect(password).toBeInTheDocument()
        const conFirmPassword = screen.getByTestId('confirm-password')
        expect(conFirmPassword).toBeInTheDocument()

        const fnamecontainer = await screen.getByTestId('fname-container')
        expect(fnamecontainer).toBeInTheDocument()


        const emailcontainer = await screen.getByTestId('email-container')
        expect(emailcontainer).toBeInTheDocument()
        const createButton = screen.getByTestId('create-account-btn')
        expect(createButton).toBeInTheDocument()


        await event.type(fName, 'jasvika')
        await event.type(lName, 'p')
        await event.type(mobile, '9965003581')
        await event.type(emailID, 'jasvika@gmail.com')
        await event.type(password, 'Jasvika@2020')
        await event.type(conFirmPassword, 'Jasvika@2020')


        await expect(fName).toHaveValue('jasvika')
        await expect(lName).toHaveValue('p')
        await expect(mobile).toHaveValue('9965003581')
        await expect(emailID).toHaveValue('jasvika@gmail.com')
        await expect(password).toHaveValue('Jasvika@2020')
        await expect(conFirmPassword).toHaveValue('Jasvika@2020')

        await event.click(createButton)
    })



    it('should check no values', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );

        const createButton = screen.getByTestId('create-account-btn');
        await event.click(createButton);

        const firstnameerror = screen.getByTestId('first-name-error')
        expect(firstnameerror).toBeInTheDocument()
        const emailerror = screen.getByTestId('email-error')
        expect(emailerror).toBeInTheDocument()
        const mobileerror = screen.getByTestId('mobile-error')
        expect(mobileerror).toBeInTheDocument()

        const passworderror = screen.getByTestId('password-error')
        expect(passworderror).toBeInTheDocument()
        const conpassworderror = screen.getByTestId('conpassword-error')
        expect(conpassworderror).toBeInTheDocument()

    });


    it('should check any one missing values', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );

        const fName = screen.getByTestId('first-name')
        expect(fName).toBeInTheDocument()
        const lName = screen.getByTestId('last-name')
        expect(lName).toBeInTheDocument()
        const emailID = screen.getByTestId('emailid')
        expect(emailID).toBeInTheDocument()
        const mobile = screen.getByTestId('mobile')
        expect(mobile).toBeInTheDocument()
        const password = screen.getByTestId('password')
        expect(password).toBeInTheDocument()
        const conFirmPassword = screen.getByTestId('confirm-password')
        expect(conFirmPassword).toBeInTheDocument()


        const createButton = screen.getByTestId('create-account-btn')
        expect(createButton).toBeInTheDocument()

        await event.clear(fName);
        await event.type(lName, 'p')
        await event.type(mobile, '9965003581')
        await event.type(emailID, 'jasvika@gmail.com')
        await event.type(password, 'Jasvika@2020')
        await event.type(conFirmPassword, 'Jasvika@2020')
        await event.click(createButton)
        const firstnameerror = screen.getByTestId('first-name-error')
        expect(firstnameerror).toBeInTheDocument()

    })

    it('should check  error on confirm password doesntmatch', async () => {
        render(<Provider store={store}>
            <MemoryRouter>
                <CreateAccountPage />
            </MemoryRouter>
        </Provider>)

        const fName = screen.getByTestId('first-name')
        expect(fName).toBeInTheDocument()
        const lName = screen.getByTestId('last-name')
        expect(lName).toBeInTheDocument()
        const emailID = screen.getByTestId('emailid')
        expect(emailID).toBeInTheDocument()
        const mobile = screen.getByTestId('mobile')
        expect(mobile).toBeInTheDocument()
        const password = screen.getByTestId('password')
        expect(password).toBeInTheDocument()
        const conFirmPassword = screen.getByTestId('confirm-password')
        expect(conFirmPassword).toBeInTheDocument()
        const createButton = screen.getByTestId('create-account-btn')
        expect(createButton).toBeInTheDocument()

        await event.type(fName, 'jasvika')
        await event.type(lName, 'p')
        await event.type(mobile, '9965003581')
        await event.type(emailID, 'jasvika@gmail.com')
        await event.type(password, 'Jasvika@2020')
        await event.type(conFirmPassword, 'Jasvika@252020')


        await event.click(createButton)


        const bothpassowrderror = screen.getByTestId('bothpassowrd-error')
        expect(bothpassowrderror).toBeInTheDocument()


    })





})