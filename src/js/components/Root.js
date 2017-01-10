import React from 'react'
import classNames from 'classNames'
import { browserHistory, IndexLink, Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('sessionsStore')
@observer
export default class Root extends React.Component {
  
  componentDidMount() {
    this.checkAccessToken()
  }
  
  componentWillUpdate(nextProps, nextState) {
    this.checkAccessToken()
  }
  
  checkAccessToken() {
    let accessToken = this.props.sessionsStore.getAccessToken()
    let location = this.props.location.pathname
    if (accessToken == null) {
      // accessToken is null
      if (location != '/sign-in') {
        browserHistory.push('/sign-in')
      }
    } else {
      // accessToken is present
      if (location == '/sign-in') {
        browserHistory.push('/articles')
      }
    }
  }
  
  signOut() {
    this.props.sessionsStore.delete()
  }
  
  render() {
    let adminMenuClassNames = classNames({
      admin: true,
      menu: true,
      hidden: this.props.sessionsStore.accessToken == null
    })
    
    let adminMenu = <div></div>
    let location = this.props.location.pathname
    if (location != '/sign-in') {
      adminMenu = (
        <div className={ adminMenuClassNames }>
          <Link to={ '/articles' } activeClassName='active'>Articles</Link>
          <Link to={ '/images' } activeClassName='active'>Images</Link>
          <Link to={ '/pages' } activeClassName='active'>Pages</Link>
          <Link to={ '/projects' } activeClassName='active'>Projects</Link>
          <a href='#logout' onClick={ () => { this.signOut() } }>Sign Out</a>
        </div>
      )
    }
    
    return (
      <div className='root-container'>
        { adminMenu }
        { this.props.children }
      </div>
    )
  }
}