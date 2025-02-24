/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import CreatePG from "../Components/CreatePG";

describe('test create PG UI', () => {

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