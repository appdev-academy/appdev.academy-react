import { observable, action } from 'mobx';
import axios from 'axios'

const API_URL = 'https://serene-ocean-15499.herokuapp.com/api/v1'

export default class AppState {
  @observable articles = []
  @observable article = {}
  
  @action loadArticles() {
    let request = axios({
      method: 'get',
      url: `${API_URL}/articles`,
      headers: []
    })
    request.then((response) => {
      // TODO: Handle errors here
      this.articles = response.data
    })
  }
  
  @action fetchArticle(articleID) {
    let request = axios({
      method: 'get',
      url: `${API_URL}/articles/${articleID}`,
      headers: []
    })
    request.then((response) => {
      this.article = response.data
    })
  }
}