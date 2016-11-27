import React from 'react'

export default class Preview extends React.Component {
  render() {
    return (
      <div className={ this.props.showType }>
        <div className='content' dangerouslySetInnerHTML={{ __html: this.props.htmlDocument }} />
      </div>
    )
  }
}