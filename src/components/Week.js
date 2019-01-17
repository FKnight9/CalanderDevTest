import React, { Component } from 'react'
import moment from 'moment'
import Item from './Item'


export default class Week extends Component {

  handleDoubleClick(weekIndex, weekdayIndex, weekdayDate) {
    // If day is in the past, dont allow click
    if (moment() > weekdayDate) {
      return
    }
    this.props.actions.addReminder(weekIndex, weekdayIndex)
  }

  getDayClass(day) {
    const { currentMonthIndex } = this.props;
    const today = moment()
    const classes = ['week__day']

    if (today.isSame(day, 'd')) {
      classes.push('week__day--today')
    }

    if (today > day || currentMonthIndex < 0) {
      classes.push('week__day--past')
    }

    if (day.day() === 0 || day.day() === 6) {
      classes.push('week__day--weekend')
    }

    return classes.join(' ')
  }

  render() {
    const { week, actions } = this.props
    return (
      <div key={week.uuid} className='week'>
        {week.days.map((weekday) => (
          <div
            key={weekday.uuid}
            className={this.getDayClass(weekday.date)}
            onDoubleClick={() => this.handleDoubleClick(week.index, weekday.index, weekday.date)}
          >
            {weekday.date.format('D')}
            {weekday.reminders.map((reminder) => (
              <Item
                key={reminder.uuid}
                reminder={reminder}
                weekIndex={week.index}
                weekdayIndex={weekday.index}
                updateReminder={actions.updateReminder}
                removeReminder={actions.removeReminder}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }
}
