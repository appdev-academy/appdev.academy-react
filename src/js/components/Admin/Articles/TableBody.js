import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import TableRow from './TableRow'

export default class TableBody extends React.Component {
  
  render() {
    let articles = this.props.articles
    
    return (
      <tbody>
        { articles.map((article, index) => {
          return (
            <TableRow
              key={ article.id }
              article={ article }
              deleteButtonClick={ (articleID) => { this.props.deleteButtonClick(articleID) }}
              publishButtonClick={ (articleID) => { this.props.publishButtonClick(articleID) }}
              hideButtonClick={ (articleID) => { this.props.hideButtonClick(articleID) }}
              id={ article.id }
              index={ index }
              text={ article.title }
            />
          )
        })}
      </tbody>
    )
  }
}