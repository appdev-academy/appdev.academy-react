import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class Employees {
  sessionsStore;
  @observable employees = []
  @observable employee = {}
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchIndex() {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/employees`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.employees = response.data.employees
      }
    })
  }
  
  @action fetchShow(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'GET',
      url: `${API_URL}/employees/${id}`,
      data: null,
      headers: headers
    })
    return request
  }
  
  @action create(params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'POST',
      url: `${API_URL}/employees`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action update(id, params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'PUT',
      url: `${API_URL}/employees/${id}`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action delete(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'DELETE',
      url: `${API_URL}/employees/${id}`,
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
      url: `${API_URL}/employees/${id}/publish`,
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
      url: `${API_URL}/employees/${id}/hide`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
  
  @action sort(employeeIDs) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/employees/sort`,
      data: { employee_ids: employeeIDs },
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
}
