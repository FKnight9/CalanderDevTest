import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

const propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool
}

const defaultProps = {
  text: '',
  category: 'home',
  time: `${moment().format('HH')}:${moment().minutes()}`
}

class Form extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      text: this.props.text,
      category: this.props.category,
      time: this.props.time
    }

    this.toggleIsActive = this.toggleIsActive.bind(this)
  }

  toggleIsActive () {
    this.setState({ active: !this.state.active })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { category } = this.state;

    const updatedReminder = {
      category,
      updateTime: moment(),
      newReminder: false,
      open: false
    }

    this.setState({ editing: false })
    this.props.onSave(updatedReminder)
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handletimeChange = e => {
    if (e.target.value < moment().format('HH:mm')) {
      return;
    }

    let timeArray = e.target.value.split(':')
    const hours = timeArray[0];
    const minutes = timeArray[1];

    const updatedStartDate = this.props.date.set({
      'hour': hours,
      'minute': minutes
    })

    this.setState({
      time: e.target.value,
      date: updatedStartDate
    })
  }

  render () {

    if (this.props.editing === false) {
      return null;
    }

    return (
      <form className="reminder" onSubmit={this.handleSubmit}>
        <input
          id="inputs"
          type="type"
          maxLength="30"
          placeholder={this.props.placeholder || 'Reminder'}
          autoFocus={true}
          value={this.props.text}
          onChange={this.props.onChange}
        />
        <select
          id="center"
          onChange={this.props.onCategoryChange}
          value={this.props.category}
        >
          <option value="relax">Relax</option>
          <option value="soon">Soon</option>
          <option value="urgent">Urgent</option>
        </select>

        <input
          type="time"
          value={this.state.time}
          onChange={this.handletimeChange}
        />

        <button type="button" className="button a1" onClick={this.props.onDelete}>Delete</button>
        <button type="submit" className="button a2" >Save</button>
      </form>
    )
  }
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default Form
