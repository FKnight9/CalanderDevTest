import React, { Component } from 'react'
import NavContainer from '../containers/NavContainer'
import DaysOfTheWeek from './DaysOfTheWeek'
import MonthContainer from '../containers/MonthContainer'

export default class Layout extends Component {
  render() {
    return (
      <div className='calander'>
        <NavContainer />
        <DaysOfTheWeek />
        <MonthContainer />
      </div>
    )
  }
}
