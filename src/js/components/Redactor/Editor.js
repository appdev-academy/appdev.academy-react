import React from 'react'
import Textarea from 'react-textarea-autosize'

export default class Editor extends React.Component {
  render() {
    return (
      <div className={ this.props.showType }>
        <h4 className='center'>Editor</h4>
        <Textarea value={ this.props.text } onChange={ this.props.onChange } rows={ 3 }></Textarea>
      </div>
    )
  }
}