import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class Projects {
  sessionsStore;
  @observable projects = []
  @observable project = {}
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchIndex() {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/projects`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.projects = response.data
      }
    })
  }
  
  @action fetchShow(id) {
    this.project = {}
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'GET',
      url: `${API_URL}/projects/${id}`,
      data: null,
      headers: headers
    })
    return request
  }
  
  @action create(params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'POST',
      url: `${API_URL}/projects`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action update(id, params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'PUT',
      url: `${API_URL}/projects/${id}`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action delete(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'DELETE',
      url: `${API_URL}/projects/${id}`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
  
  @action publish(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/projects/${id}/publish`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
  
  @action hide(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/projects/${id}/hide`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
  
  @action sort(projectIDs) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/projects/sort`,
      data: { project_ids: projectIDs },
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
}
