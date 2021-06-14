import { fetchConToken, fetchSinToken } from "../../helpers/fetch"

describe('tests for fetch.js', () => {

    let token = ''
    

    test('fetchSinToken should work', async() => {
        
        const res = await fetchSinToken('auth', {email: 'tmltc@gmail.com', password: 'pass00'}, 'POST');
        expect( res instanceof Response). toBe(true);
        const body = await res.json()
        expect( body.ok ).toBe(true)

        token = body.token;
    })

    test('fetchConToken should work', async() => {
        
        localStorage.setItem('token', token)
        const res = await fetchConToken('events/dsds', {}, 'DELETE');
        const body = await res.json();

        expect( body.msg ).toBe('Error bro');
    })
    

})
