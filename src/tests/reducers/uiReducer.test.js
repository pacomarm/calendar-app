import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer"


const initialState = {
    modalOpen: false
}

describe('uiReducer tests', () => {

    test('should return default state', () => {
        const state = uiReducer(initialState, {});
        expect(state).toEqual(initialState);
    })

    test('should open and close modal', () => {

        const modalOpen = uiOpenModal();
        const state = uiReducer(initialState, modalOpen);
        expect(state).toEqual({modalOpen: true});

        const modalClose = uiCloseModal();
        const state2 = uiReducer(initialState, modalClose);
        expect(state2).toEqual({modalOpen: false});
    })
    
    
})
