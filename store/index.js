/* eslint-disable */
import axios from 'axios';

export const state = () => ({
  organisation: Object,
});

export const mutations = {
  setOrganisation(state, organisation) {
    state.organisation = organisation;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { error }) {
    return axios.get(encodeURI(`${process.env.apiUri}/api/v1/organizations/?client=${process.env.clientId}`))
      .then((res) => {
        commit('setOrganisation', res.data[0]);
      })
      .catch(() => error({ code: 500, message: 'Something went wrong', homepage: true }));
  }
};

export const getters = {
  getOrganisation(state) {
    return state.organisation;
  }
};
