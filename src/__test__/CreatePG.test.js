import { render, screen, fireEvent } from "@testing-library/react";
import CreatePG from "../Components/CreatePG";
import userEvent from "@testing-library/user-event";

describe('test create PG UI', () => {

    const event = userEvent.setup()
    const props = {
        handleFloorList: jest.fn(),
        index: 0
    }

    it('it should render UI elements', async () => {
        render (<CreatePG {...props}/>)
        const inputElement = screen.getByTestId('input-no-rooms')
        expect(inputElement).toBeInTheDocument()
    })
})