import React from 'react'
import PropTypes from 'prop-types'

import Form from './Form'
import Label from './Label'

const propTypes = {
  disabled: PropTypes.bool
}

const defaultProps = {
  text: 'New Reminder'
}

class ReminderItem extends React.Component {
  constructor (props) {
    super(props)
    console.log(props);
    this.state = {
      editing: this.props.reminder.newReminder,
      active: false,
      category: this.props.reminder.category,
      text: this.props.reminder.text
    }

  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (formFields) => {
    const updatedReminder = {
      ...this.props.reminder,
      ...formFields,
      text: this.state.text,
      category: this.state.category
    }

    this.props.updateReminder(this.props.weekIndex, this.props.weekdayIndex, updatedReminder);
    this.setState({ editing: false })
  }

  handleCategoryChange = event => {
    this.setState({ category: event.target.value })
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleClick = () => {
    this.setState({ active: !this.state.active, editing: true })
  }

  removeReminder = () => {
    this.props.removeReminder(this.props.weekIndex, this.props.weekdayIndex, this.props.reminder)
  }

  render () {
    return (
      <div className="reminder">
        <Label
          text={this.state.text}
          category={this.state.category}
          handleClick={this.handleClick}
        />
        <Form
          text={this.state.text}
          category={this.state.category}
          date={this.props.reminder.date}
          time={this.props.reminder.time}
          editing={this.state.editing}
          onChange={this.handleChange}
          onCategoryChange={this.handleCategoryChange}
          onSave={(reminder) => this.handleSave(reminder)}
          onDelete={this.removeReminder}
        />
      </div>
    )
  }
}

ReminderItem.propTypes = propTypes
ReminderItem.defaultProps = defaultProps

export default ReminderItem
