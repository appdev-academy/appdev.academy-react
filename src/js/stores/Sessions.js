import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

const ACCESS_TOKEN_KEY = 'access-token'

export default class SessionsStore {
  @observable accessToken = null
  
  @action create(email, password) {
    let params = {
      email: email,
      password: password
    }
    let request = axios({
      method: 'POST',
      url: `${API_URL}/sessions`,
      params: params
    }).then((response) => {
      if (response.status == 200) {
        this.setAccessToken(response.data.access_token)
      }
    })
  }
  
  @action delete() {
    let accessToken = this.getAccessToken()
    let request = axios({
      method: 'DELETE',
      url: `${API_URL}/sessions/destroy`,
      headers: ['X-Access-Token': accessToken]
    }).then((response) => {
      if (response.status == 200) {
        this.removeAccessToken()
      }
    })
  }
  
  setAccessToken(accessToken) {
    this.accessToken = accessToken
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  }
  
  getAccessToken() {
    if (!this.accessToken) {
      let accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY)
      this.accessToken = accessToken
    }
    return this.accessToken
  }
  
  removeAccessToken() {
    this.accessToken = null
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  }
  
  getAuthHeaders() {
    let accessToken = this.getAccessToken()
    return { 'X-Access-Token': accessToken }
  }
}