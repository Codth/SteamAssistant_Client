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

    appendToList(state, message) {
        state.Maintain_msg.push(message)
    }
}

const actions = {
    addCurMsg: ({ commit }, payload) => commit('addCurMsg', payload),
    appendToList_ServerMsg: ({ commit },payload) => commit('appendToList',payload),
    appendToList_ClientMsg({ commit },payload){
        payload = clientSelfMsg(payload)
        commit('appendToList',payload)
    }
}

const getters = {
    getList: state => state.Maintain_msg
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
        },
        serial: 16
    }
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
