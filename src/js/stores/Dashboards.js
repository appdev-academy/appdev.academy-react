import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class Dashboards {
  sessionsStore;
  @observable main = {};
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchMain() {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/dashboards/main`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.main = response.data
      }
    })
  }
}
