import React from 'react'

export default class Preview extends React.Component {
  render() {
    return (
      <div className={ this.props.showType }>
        <h4 className='center'>Preview</h4>
        <div className='content' dangerouslySetInnerHTML={{ __html: this.props.htmlDocument }} />
      </div>
    )
  }
}