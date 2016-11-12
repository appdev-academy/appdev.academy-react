import React from 'react'

export default class Editor extends React.Component {
  render() {
    return (
      <div className={ this.props.showType }>
        <h4 className='center'>Editor</h4>
        <textarea value={ this.props.text } onChange={ this.props.onChange } ></textarea>
      </div>
    )
  }
}