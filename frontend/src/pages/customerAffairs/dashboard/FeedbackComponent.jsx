import React, { Component } from 'react'
import Feedbacklist from '../feedbacklist'

export default class FeedbackComponent extends Component {
  render() {
    return (
      <div>
        <h1>Feedback Management</h1>
        <Feedbacklist />
      </div>
    )
  }
}
