import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    curMsg : "",
    Maintain_msg: []
}

const mutations = {
    addCurMsg(state, message) {
        state.curMsg = message
    },

    appendToList(state, {payload, getters}) {
        payload['serial'] = getters.getCounter + 1
        state.Maintain_msg.push(payload)
    }

}

const actions = {
    addCurMsg: ({ commit }, payload) => commit('addCurMsg', payload),
    appendToList_ServerMsg: ({ commit, getters },payload) => commit('appendToList',{payload, getters}),
    appendToList_ClientMsg({ commit, getters },payload){
        payload = clientSelfMsg(payload)
        commit('appendToList', {payload, getters})
    }
}

const getters = {
    getList: state => state.Maintain_msg,
    getCounter: state => state.Maintain_msg.length
}

function clientSelfMsg(msg){
    return {
        sender: true,
        setting: {
            dialogType: 999,
            replyType: 999
        },

        hasPrompt: true,
        prompt: {
            promptType: 1,
            prompt_index: 1,
            prompt_content: msg,
        },

        hasOptions: false,
        options: {
            optionType: 1,
            array: []
        }
    }
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
