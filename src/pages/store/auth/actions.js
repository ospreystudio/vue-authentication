let timer;

export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },

    async auth (context, payload) {
        const mode = payload.mode;

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4WBjhHAMaq0doIf9tE0F3x9DYcX7OAEY'

        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4WBjhHAMaq0doIf9tE0F3x9DYcX7OAEY'
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.');
            throw error;
        }
        // const expiresIn = +responseData.expires * 1000;
        const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn

        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)
        localStorage.setItem('tokenExpiration', expirationDate)

        timer = setTimeout(function () {
            context.dispatch('didAutoLogout')
        }, expiresIn)


        console.log(responseData);
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: expirationDate
        });
    },

    tryLogin (context) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
        const tokenExpiration = localStorage.getItem('tokenExpiration')

        const expirationIn = +tokenExpiration - new Date().getTime()

        if (expirationIn < 0) {
            return
        }

        timer = setTimeout(function() {
            context.dispatch('didAutoLogout')
        }, expirationIn)

        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
            })
        }

    },

    logout(context) {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('tokenExpiration')

        clearTimeout(timer)

        context.commit('setUser', {
            token: null,
            userId: null,
        })
    },

    didAutoLogout(context) {
        context.dispatch('logout')
        context.commit('setAutoLogout')
    }

};