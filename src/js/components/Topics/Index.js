import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

import TableBody from './TableBody'

@inject('topicsStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    this.props.topicsStore.fetchIndex()
  }
  
  moveTopic(startIndex, dropIndex) {
    if (startIndex == dropIndex) {
      return
    }
    
    let topicIDs = this.props.topicsStore.topics.map((topic) => topic.id)
    let draggedTopicID = topicIDs[startIndex]
    topicIDs.splice(startIndex, 1)
    topicIDs.splice(dropIndex, 0, draggedTopicID)
    // Sort Topics on server (assign position property to each Topic according to order of IDs)
    this.props.topicsStore.sort(topicIDs)
  }
  
  render() {
    return (
      <div className='topics'>
        <h2 className='center'>Topics</h2>
        <Link className='button blue' to='/topics/new'>+ New Topic</Link>
        <br />
        <br />
        <table className='admin'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Slug</td>
              <td>Position</td>
              <td>Actions</td>
              <td>Publish</td>
            </tr>
          </thead>
          <TableBody
            topics={ this.props.topicsStore.topics }
            publishButtonClick={ (topicID) => { this.props.topicsStore.publish(topicID) }}
            hideButtonClick={ (topicID) => { this.props.topicsStore.hide(topicID) }}
            moveTopic={ this.moveTopic.bind(this) }
          />
        </table>
      </div>
    )
  }
}
