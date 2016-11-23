import { observable, action } from 'mobx'
import axios from 'axios'

const API_URL = 'http://new.appdev.academy/api/react'

export default class AppState {
  @observable images = []
  
  @action loadArticleImages() {
    let request = axios({
      method: 'get',
      url: `${API_URL}/article_images`,
      headers: []
    })
    request.then((response) => {
      if (response.status == 200) {
        this.images = response.data
      }
    })
  }
  
  @action uploadArticleImage(params) {
    const request = axios({
      method: 'POST',
      data: params,
      url: `${API_URL}/article_images`
    })
    
    return request
  }
}