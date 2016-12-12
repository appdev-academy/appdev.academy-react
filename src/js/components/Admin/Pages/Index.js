import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

@inject('pagesStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    this.props.pagesStore.fetchIndex()
  }
  
  // Render list of Pages
  renderPages(pages) {
    return pages.map((page) => {
      let capitalizedSlug = page.slug.charAt(0).toUpperCase() + page.slug.slice(1)
      
      return (
        <tr key={ page.id }>
          <td>{ capitalizedSlug }</td>
          <td className='actions left'>
            <Link className='button blue' to={ `/admin/pages/${page.slug}` }>Show</Link>
            <Link className='button green' to={ `/admin/pages/${page.slug}/edit` }>Edit</Link>
          </td>
        </tr>
      )
    })
  }
  
  render() {
    return (
      <div className='pages'>
        <h2 className='center'>Pages</h2>
        <table className='admin'>
          <thead>
            <tr>
              <td>Title</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            { this.renderPages(this.props.pagesStore.pages) }
          </tbody>
        </table>
      </div>
    )
  }
}