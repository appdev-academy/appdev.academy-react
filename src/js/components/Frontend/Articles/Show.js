import React from 'react'
import Helmet from 'react-helmet'
import { inject, observer } from 'mobx-react'
import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

const {
  TwitterShareButton,
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  VKShareButton,
} = ShareButtons

const TwitterIcon = generateShareIcon('twitter')
const FacebookIcon = generateShareIcon('facebook')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')
const VKIcon = generateShareIcon('vk')

@inject('articlesStore')
@observer
export default class Show extends React.Component {
  
  componentDidMount() {
    let articleID = this.props.params.articleID
    this.props.articlesStore.fetchShow(articleID).then(response => {
      if (response.status == 200) {
        this.props.articlesStore.article = response.data
      }
    })
  }
  
  renderShareButtons() {
    let article = this.props.articlesStore.article
    let articleURL = location.href
    return (
      <div className='share-buttons'>
        <TwitterShareButton url={ articleURL } title={ article.title }>
          <TwitterIcon size={ 48 } round />
        </TwitterShareButton>
        <FacebookShareButton url={ articleURL } title={ article.title }>
          <FacebookIcon size={ 48 } round />
        </FacebookShareButton>
        <GooglePlusShareButton url={ articleURL }>
          <GooglePlusIcon size={ 48} round />
        </GooglePlusShareButton>
        <LinkedinShareButton url={ articleURL } title={ article.title }>
          <LinkedinIcon size={ 48 } round />
        </LinkedinShareButton>
        <VKShareButton url={ articleURL } title={ article.title }>
          <VKIcon size={ 48 } round />
        </VKShareButton>
      </div>
    )
  }
  
  render() {
    let article = this.props.articlesStore.article
    let authorName = ''
    if (article.author) {
      authorName = article.author.full_name
    }
    let metaTitle = 'App Dev Academy | ' + article.title
    let helmet = <Helmet title={ metaTitle } />
    if (article.image_url) {
      helmet = (
        <Helmet
          title={ metaTitle }
          meta={[
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:site', content: '@AppDev_Academy' },
            { name: 'twitter:creator', content: '@MaksymSkliarov' },
            { name: 'twitter:title', content: article.title },
            { name: 'twitter:image', content: article.image_url }
          ]}
        />
      )
    }
    
    return (
      <div className='article-container'>
        { helmet }
        <h2 className='center'>{ article.title }</h2>
        <div>Published by { authorName } on { article.published_at }</div>
        <div>last update on { article.updated_at }</div>
        <div dangerouslySetInnerHTML={{ __html: article.html_content }} />
        { this.renderShareButtons() }
      </div>
    )
  }
}