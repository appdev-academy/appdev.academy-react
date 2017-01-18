import React from 'react'
import { Link } from 'react-router'
import { inject, observer } from 'mobx-react'

import TableBody from './TableBody'

@inject('lessonsStore')
@observer
export default class Index extends React.Component {
  
  componentDidMount() {
    let screencastID = this.props.params.screencastID
    this.props.lessonsStore.fetchIndex(screencastID)
  }
  
  moveLesson(startIndex, dropIndex) {
    if (startIndex == dropIndex) {
      return
    }
    
    let screencastID = this.props.params.screencastID
    
    let lessonIDs = this.props.lessonsStore.lessons.map((article) => article.id)
    let draggedLessonID = lessonIDs[startIndex]
    lessonIDs.splice(startIndex, 1)
    lessonIDs.splice(dropIndex, 0, draggedLessonID)
    // Sort Lessons on server (assign position property to each Lesson according to order of IDs)
    this.props.lessonsStore.sort(screencastID, lessonIDs)
  }
  
  render() {
    let topicID = this.props.params.topicID
    let screencastID = this.props.params.screencastID
    
    return (
      <div className='lessons'>
        <h2 className='center'>Lessons</h2>
        <Link className='button blue' to={ `/topics/${topicID}/screencasts/${screencastID}/lessons/new` }>+ New Lesson</Link>
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
            lessons={ this.props.lessonsStore.lessons }
            publishButtonClick={ (screencastID, lessonID) => { this.props.lessonsStore.publish(screencastID, lessonID) }}
            hideButtonClick={ (screencastID, lessonID) => { this.props.lessonsStore.hide(screencastID, lessonID) }}
            moveLesson={ this.moveLesson.bind(this) }
          />
        </table>
      </div>
    )
  }
}
