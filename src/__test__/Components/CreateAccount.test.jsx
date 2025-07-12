import { describe, expect } from "vitest";
import CreateAccountPage from "../../Components/CreateAccount";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import CreateAccountReducer from '../../Redux/Reducer/CreateAccountReducer'


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


    it('should check invalid email format', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );
        const emailID = screen.getByTestId('emailid')
        expect(emailID).toBeInTheDocument()
        const createButton = screen.getByTestId('create-account-btn')
        expect(createButton).toBeInTheDocument()

        await event.type(emailID, 'invalid@')
        await event.click(createButton);
        const emailerror = screen.getByTestId('email-error')
        expect(emailerror).toBeInTheDocument()

    }
    )

    it('should check first name validation', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );
        const fName = screen.getByTestId('first-name')
        expect(fName).toBeInTheDocument()
        const createButton = screen.getByTestId('create-account-btn')
        expect(createButton).toBeInTheDocument()

        await event.type(fName, '12345875')
        await event.click(createButton);
        const firstnameerror = screen.getByTestId('first-name-error')
        expect(firstnameerror).toBeInTheDocument()

    }
    )


    it('should check last name validation', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );
        const lName = screen.getByTestId('last-name')
        expect(lName).toBeInTheDocument()
        const createButton = screen.getByTestId('create-account-btn')
        expect(createButton).toBeInTheDocument()

        await event.type(lName, '12345875')
        await event.click(createButton);


    }
    )

    it('should check password validation', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );
        const password = screen.getByTestId('password')
        expect(password).toBeInTheDocument()
        const createButton = screen.getByTestId('create-account-btn')
        expect(createButton).toBeInTheDocument()

        await event.type(password, 'pass word')
        await event.click(createButton);

        const passworderrorcontainer = screen.getByTestId('password-error-container')
        expect(passworderrorcontainer).toBeInTheDocument()
    }
    )

    it('should handle login ', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );
        const navigateLogin = screen.getByTestId('navigate-login')
        expect(navigateLogin).toBeInTheDocument()
        await event.click(navigateLogin);

    }
    )

    it('should handle navigate landing page', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );
        const navigatelandingpage = screen.getByTestId('navigate-landingpage')
        expect(navigatelandingpage).toBeInTheDocument()
        await event.click(navigatelandingpage);

    }
    )


    it('should handle togglepassword', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );
        const togglepassword = screen.getByTestId('togglepassword')
        expect(togglepassword).toBeInTheDocument()
        await event.click(togglepassword);

    })

    it('should handle toggleconfirmpassword', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );
        const toggleconfirmpassword = screen.getByTestId('toggleconfirmpassword')
        expect(toggleconfirmpassword).toBeInTheDocument()
        await event.click(toggleconfirmpassword);

    })


    it('should check all mandatory missing values', async () => {
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
        const countrycodeerror = screen.getByTestId('countrycode-error')
        expect(countrycodeerror).toBeInTheDocument()
        const mobile = screen.getByTestId('mobile')
        expect(mobile).toBeInTheDocument()
        const password = screen.getByTestId('password')
        expect(password).toBeInTheDocument()
        const conFirmPassword = screen.getByTestId('confirm-password')
        expect(conFirmPassword).toBeInTheDocument()


        const createButton = screen.getByTestId('create-account-btn')
        expect(createButton).toBeInTheDocument()

        await event.clear(fName)
        await event.clear(lName)
        await event.clear(mobile)
        await event.clear(emailID)
        await event.clear(password)
        await event.clear(conFirmPassword)
        await event.click(createButton)
        const allmandatoryerror = screen.getByTestId('allmandatoryerror')
        expect(allmandatoryerror).toBeInTheDocument()

    })


    it('should check phone number validation', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CreateAccountPage />
                </MemoryRouter>
            </Provider>
        );
        const mobile = screen.getByTestId('mobile')
        expect(mobile).toBeInTheDocument()
        const createButton = screen.getByTestId('create-account-btn')
        expect(createButton).toBeInTheDocument()

        await event.type(mobile, '123456895')
        await event.click(createButton);
        const mobileerror = screen.getByTestId('mobile-error')
        expect(mobileerror).toBeInTheDocument()
    })




// it('should check network error', async () => {


//     const preloadedState = {
//     createAccount: {
//       networkError: 'Network connection failed',
//     },
//   };

//   const mockStore = configureStore({
//     reducer: {
//       createAccount: CreateAccountReducer,
//     },
//    preloadedState,
//   });


//         render(
//             <Provider store={mockStore}>
//                 <MemoryRouter>
//                     <CreateAccountPage />
//                 </MemoryRouter>
//             </Provider>
//         );
       
//         const networkError = screen.getByTestId('network-error')
//         expect(networkError).toBeInTheDocument()
      
//     })





})