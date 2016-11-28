import { observable, action } from 'mobx'
import axios from 'axios'

import { API_URL } from '../constants'

export default class SessionsStore {
  
  const ACCESS_TOKEN_KEY = 'access-token'
  
  @action create(email, password) {
    let request = axios({
      method: 'POST',
      url: `${API_URL}/sessions`,
      headers: []
    }).then((response) => {
      if (response.status == 200) {
        this.setAccessToken(response.data.access_token)
      }
    })
  }
  
  @action delete() {
    let accessToken = window.localStorage.getItem('access-token')
    let request = axios({
      method: 'DELETE',
      url: `${API_URL}/sessions`,
      headers: ['X-Browser-Token': this.getAccessToken()]
    })
    return request
  }
  
  setAccessToken(accessToken) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  }
  
  getAccessToken() {
    return = window.localStorage.getItem(ACCESS_TOKEN_KEY)
  }
  
  removeAccessToken() {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY)
  }
}