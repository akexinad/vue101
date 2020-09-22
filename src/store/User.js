import { SET_USER } from "./mutationTypes";

export const UserModule = {
    namespace: true,

    state: {
        user: null
    },
  
    /**
     * mutation are functions that
     * EFFECT THE STATE
     */
    mutations: {
      SET_USER(state, user) {
        state.user = user;
      },
    },
  
    /**
     * actions are function that YOU call
     * throughout the app that CALL MUTATIONS
     */
    actions: {
      setUser({ commit }, user) {
        commit(SET_USER, user);
      },
    },
}