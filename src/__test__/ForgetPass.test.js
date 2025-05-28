/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import ForgetPasswordPage from "../Components/Forgetpass";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";





describe('test for forget password', () => {

    const event = userEvent.setup()
    const mockStore = configureStore()
      const store = mockStore({
        NewPass: {
            statusCodeForgotOtp: 201
        }
      })

    it ('it should render forget password', async () => {
        render(
        <Provider store={store}>
            <MemoryRouter>
                <ForgetPasswordPage />
            </MemoryRouter>
            
        </Provider>
        )

        const emailElement = screen.getByTestId('input-email')
        expect(emailElement).toBeInTheDocument()

        await event.type(emailElement, 'abc@gmail.com')

    })
})