import React from 'react'
import classNames from 'classNames'
import { browserHistory, Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('sessionsStore')
@observer
export default class Admin extends React.Component {
  
  componentDidMount() {
    this.checkAccessToken(this.props.location.pathname)
  }
  
  componentWillUpdate(nextProps, nextState) {
    this.checkAccessToken(nextProps.location.pathname)
  }
  
  checkAccessToken(location) {
    this.props.sessionsStore.getAccessToken()
    let accessToken = this.props.sessionsStore.accessToken
    if (this.props.sessionsStore.accessToken == null) {
      // accessToken is null
      if (location != '/admin/sign-in') {
        browserHistory.push('/admin/sign-in')
      }
    } else {
      // accessToken is present
      if (location == '/admin/sign-in') {
        browserHistory.push('/admin/articles')
      }
    }
  }
  
  render() {
    let adminMenuClassNames = classNames({
      admin: true,
      menu: true,
      hidden: this.props.sessionsStore.accessToken == null
    })
    
    return (
      <div className='admin-container' >
        <div className={ adminMenuClassNames }>
          <Link to={ '/admin/articles' } activeClassName='active'>Articles</Link>
          <Link to={ '/admin/article_images' } activeClassName='active'>Article Images</Link>
        </div>
        { this.props.children }
      </div>
    )
  }
}