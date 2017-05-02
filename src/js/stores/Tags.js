import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class Tags {
  sessionsStore;
  @observable tags = []
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchIndex() {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/tags`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.tags = response.data
      }
    })
  }
}
