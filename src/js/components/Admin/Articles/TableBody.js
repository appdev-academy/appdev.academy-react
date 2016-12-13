import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import TableRow from './TableRow'

@DragDropContext(HTML5Backend)
export default class TableBody extends React.Component {
  
  moveRow(dragIndex, hoverIndex) {
    // let articles = this.props.articles
    // let article = articles[dragIndex]
    console.log('dragIndex: ' + dragIndex + 'hoverIndex: ' + hoverIndex)
    // console.log("Moved article: " + article.title)
  }
  
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
              moveRow= { this.moveRow.bind(this) }
            />
          )
        })}
      </tbody>
    )
  }
}