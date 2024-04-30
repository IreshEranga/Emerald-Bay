import React, { Component } from 'react'
import Feedbacklist from '../feedbacklist'

export default class FeedbackComponent extends Component {
  render() {
    return (
      <div>
        <h1>Feedbacks</h1>
        <Feedbacklist />
      </div>
    )
  }
}
