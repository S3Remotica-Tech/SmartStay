import { describe, expect } from "vitest";
import CreateAccountPage from "../../Components/CreateAccount";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import { MemoryRouter } from "react-router-dom";

describe('test cases for create account', () => {

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
})