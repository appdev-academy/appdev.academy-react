import React from 'react'
import classNames from 'classNames'
import { browserHistory, Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('sessionsStore')
@observer
export default class Admin extends React.Component {
  
  componentDidMount() {
    let accessToken = this.props.sessionsStore.accessToken
    let location = this.props.location.pathname
    this.checkAccessToken(accessToken, location)
    this.props.sessionsStore.getAccessToken()
  }
  
  componentWillUpdate(nextProps, nextState) {
    let accessToken = nextProps.sessionsStore.accessToken
    let location = nextProps.location.pathname
    this.checkAccessToken(accessToken, location)
  }
  
  checkAccessToken(accessToken, location) {
    if (accessToken == null) {
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
      <div>
        <div className={ adminMenuClassNames }>
          <Link to={ '/admin/articles' } activeClassName='active'>Articles</Link>
          <Link to={ '/admin/images' } activeClassName='active'>Images</Link>
          <Link to={ '/admin/pages' } activeClassName='active'>Pages</Link>
          <Link to={ '/admin/projects' } activeClassName='active'>Projects</Link>
        </div>
        { this.props.children }
      </div>
    )
  }
}