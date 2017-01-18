import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class Lessons {
  sessionsStore;
  @observable lessons = []
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchIndex(screencastID) {
    this.lessons = []
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/screencasts/${screencastID}/lessons`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.lessons = response.data
      }
    })
  }
  
  @action fetchShow(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'GET',
      url: `${API_URL}/lessons/${id}`,
      data: null,
      headers: headers
    })
    return request
  }
  
  @action create(screencastID, params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'POST',
      url: `${API_URL}/screencasts/${screencastID}/lessons`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action update(id, params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'PUT',
      url: `${API_URL}/lessons/${id}`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action delete(screencastID, id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'DELETE',
      url: `${API_URL}/lessons/${id}`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex(screencastID)
    })
  }
  
  @action publish(screencastID, id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/lessons/${id}/publish`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex(screencastID)
    })
  }
  
  @action hide(screencastID, id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/lessons/${id}/hide`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex(screencastID)
    })
  }
  
  @action sort(screencastID, lessonsIDs) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/screencasts/${screencastID}/lessons/sort`,
      data: { lesson_ids: lessonsIDs },
      headers: headers
    }).then((response) => {
      this.fetchIndex(screencastID)
    })
  }
}
