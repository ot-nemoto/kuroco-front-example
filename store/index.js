export const state = () => ({
    profile: null
})

export const getters = {
    authenticated (state) {
        return state.profile !== null
    }
}

export const mutations = {
    setProfile (state, { profile }) {
        state.profile = profile
    },
    updateLocalStorage (state, payload) {
        Object.entries(payload).forEach(([key, val]) => {
            localStorage.setItem(key, val)
        })
    }
}

export const actions = {
    async login ({ commit }, payload) {
        await this.$axios.$post('/rcms-api/4/login', payload)

        const profileRes = await this.$axios.$get('/rcms-api/4/profile')
        commit('setProfile', { profile: profileRes })
        commit('updateLocalStorage', { authenticated: true })


        const saml_request_url = 'https://example-user-pool.auth.ap-northeast-1.amazoncognito.com/oauth2/authorize'
        let res = await this.$axios.$get(saml_request_url, {
            params: {
                client_id: '6gedog8lk6lr7tn34p7nanf5ig',
                response_type: 'code',
                scope: 'email openid phone',
                redirect_uri: 'https://www.google.com/',
            }
        });
    },
    async logout ({ commit }) {
        try {
            await this.$axios.$post('/rcms-api/4/logout')
        } catch {
            /** No Process */
            /** エラーが返却されてきた場合は、結果的にログアウトできているものとみなし、これを無視します。 */
        }
        commit('setProfile', { profile: null })
        commit('updateLocalStorage', { authenticated: false })

        this.$router.push('/login')
    },
    async restoreLoginState ({ commit, dispatch }) {
        const authenticated = JSON.parse(localStorage.getItem('authenticated'))

        if (!authenticated) {
            await dispatch('logout')
            throw new Error('need to login')
        }
        try {
            const profileRes = await this.$axios.$get('/rcms-api/4/profile')
            commit('setProfile', { profile: profileRes })
        } catch {
            await dispatch('logout')
            throw new Error('need to login')
        }
    }
}