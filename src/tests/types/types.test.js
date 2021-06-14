import { types } from "../../types/types"

describe('Tests for types.js', () => {

    test('should import types correctly', () => {
        expect( types ).toEqual({

            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',
        
            eventSetActive: '[event] Set Active',
            eventLogout: '[event] Logout Events',
            eventStartAddNew: '[event] Start Add New',
            eventAddNew: '[event] Add New',
            eventClearActiveEvent: '[event] Clear Active Event',
            eventUpdate: '[event] Event Update',
            eventDeleted: '[event] Event Deleted',
            eventLoaded: '[event] Events Loaded',
        
            authCheckingFinish: '[auth] Finish Checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew: '[auth] Start Token Renew',
            authLogout: '[auth] Logout',
        })
    })
})
