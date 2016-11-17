import { observable, action } from 'mobx';
import axios from 'axios'

const API_URL = 'https://serene-ocean-15499.herokuapp.com/api/v1'

export default class AppState {
  @observable articles = []

  @action loadArticles() {
    let request = axios({
      method: 'get',
      url: `${API_URL}/articles`,
      headers: []
    })
    this.articles = request.data
  }
}