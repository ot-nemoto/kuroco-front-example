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
        // ダミーリクエスト(1秒待機の後成功/失敗する)
        const shouldSuccess = true
        const request = new Promise((resolve, reject) =>
            setTimeout(
                () => (shouldSuccess ? resolve() : reject(Error('login failure'))),
                1000
            )
        )
        await request

        commit('setProfile', { profile: {} }) // ダミーのオブジェクトをstore.state.profileに適用
        commit('updateLocalStorage', { authenticated: true })
    },
    async restoreLoginState ({ commit }) {
        const authenticated = JSON.parse(localStorage.getItem('authenticated'))

        if (!authenticated) {
            throw new Error('need to login')
        }
        commit('setProfile', { profile: {} }) // ダミーのオブジェクトをstore.
        await null
    }
}