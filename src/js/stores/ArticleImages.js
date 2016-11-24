import { observable, action } from 'mobx'
import axios from 'axios'

import { API_URL } from '../constants'

export default class ArticleImagesStore {
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