import axios from 'axios'
import { observable, action } from 'mobx'

import { API_URL } from '../constants'

export default class GalleryImages {
  sessionsStore;
  @observable images = [];
  
  constructor(sessionsStore) {
    this.sessionsStore = sessionsStore
  }
  
  @action fetchIndex(projectID) {
    this.images = []
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'GET',
      url: `${API_URL}/projects/${projectID}/gallery_images`,
      data: null,
      headers: headers
    }).then((response) => {
      if (response.status == 200) {
        this.images = response.data
      }
    })
  }
  
  @action create(projectID, params) {
    let headers = this.sessionsStore.getAuthHeaders()
    let request = axios({
      method: 'POST',
      url: `${API_URL}/projects/${projectID}/gallery_images`,
      data: params,
      headers: headers
    })
    return request
  }
  
  @action delete(projectID, id) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'DELETE',
      url: `${API_URL}/gallery_images/${id}`,
      data: null,
      headers: headers
    }).then((response) => {
      this.fetchIndex(projectID)
    })
  }
  
  @action sort(projectID, galleryImageIDs) {
    let headers = this.sessionsStore.getAuthHeaders()
    axios({
      method: 'POST',
      url: `${API_URL}/gallery_images/sort`,
      data: { gallery_image_ids: galleryImageIDs },
      headers: headers
    }).then((response) => {
      this.fetchIndex(projectID)
    })
  }
}
