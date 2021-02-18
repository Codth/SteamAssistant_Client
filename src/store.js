import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    curMsg : "",
    Maintain_msg: [],

    // Tool Bar
    CommentList: [],
    Tags_set: ['Team-Based', 'PvP', 'Trading', 'Exploration', 'Open World', 'Moddable', 'MMORPG', 'Action RPG', 'Co-op', 'City Builder', 'Automation', 'Atmospheric', 'First-Person', 'Space', 'FPS', 'War', 'Magic', 'Multiplayer', 'Base Building', 'Space Sim', 'Competitive', 'Story Rich', '3D', 'Simulation', 'Early Access', 'Action', 'RPG', 'Sandbox', 'Indie', 'Sci-fi', 'Fantasy', 'Management', 'Online Co-Op', 'Strategy', 'Great Soundtrack', 'Building', 'Fast-Paced', 'Third Person', 'Military', 'Massively Multiplayer', 'eSports', 'Resource Management', 'Difficult', 'Realistic', 'Singleplayer', 'Tactical', 'Character Customization', 'Shooter', 'Adventure'],
    showSuggestion: false
}


const mutations = {
    addCurMsg(state, message) {
        state.curMsg = message
    },

    appendToList(state, {payload, getters}) {
        if(getters.getCounter == 0){
            payload['serial'] = 0
        }else{
            payload['serial'] = getters.getCounter + 1
        }
        state.Maintain_msg.push(payload)
    },

    addToCommentList(state, payload){
        state.CommentList.splice(0, state.CommentList.length)
        state.CommentList.push(...payload)
    },

    setSuggestion(state, payload) {
        state.showSuggestion = payload
    }
}

const actions = {
    addCurMsg: ({ commit }, payload) => commit('addCurMsg', payload),
    appendToList_ServerMsg: ({ commit, getters },payload) => commit('appendToList',{payload, getters}),
    appendToList_ClientMsg({ commit, getters },payload){
        payload = clientSelfMsg(payload)
        commit('appendToList', {payload, getters})
    },
    appendToList_ClientMsg_SeverMsg({ commit, getters },payload){
        payload = clientSelfMsg(payload, false)
        payload.setting.dialogType = 998
        commit('appendToList', {payload, getters})
    },
    addToCommentList({ commit }, payload){
        payload = payload.slice(0, 4);
        commit('addToCommentList', payload)
    },
    setSuggestion: ({ commit }, payload) => commit('setSuggestion', payload),
}

const getters = {
    getList: state => state.Maintain_msg,
    getCounter: state => state.Maintain_msg.length,
    getCommentList: state => state.CommentList,
    getTagsSet: state => state.Tags_set,
    getShowSuggestions: state => state.showSuggestion
}

function clientSelfMsg(msg, sender = true){
    return {
        sender: sender,
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
