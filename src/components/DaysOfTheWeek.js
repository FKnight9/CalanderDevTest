import React, { Component } from 'react'

export default class DaysOfTheWeek extends Component {
  render() {
    return (
      <div className='calendar__header'>
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
    )
  }
}
