import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class Testimonials {
  sessionsStore;
  @observable testimonials = []
  @observable testimonial = {}
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchIndex() {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/testimonials`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.testimonials = response.data.testimonials
      }
    })
  }
  
  @action fetchShow(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'GET',
      url: `${API_URL}/testimonials/${id}`,
      data: null,
      headers: headers
    })
    return request
  }
  
  @action create(params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'POST',
      url: `${API_URL}/testimonials`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action update(id, params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'PUT',
      url: `${API_URL}/testimonials/${id}`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action delete(id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'DELETE',
      url: `${API_URL}/testimonials/${id}`,
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
      url: `${API_URL}/testimonials/${id}/publish`,
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
      url: `${API_URL}/testimonials/${id}/hide`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
  
  @action sort(testimonialIDs) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/testimonials/sort`,
      data: { testimonial_ids: testimonialIDs },
      headers: headers
    }).then((response) => {
      this.fetchIndex()
    })
  }
}
