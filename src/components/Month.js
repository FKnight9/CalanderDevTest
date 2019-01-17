import React from 'react'
import PropTypes from 'prop-types'

import WeekContainer from '../containers/WeekContainer'

const propTypes = {
  disabled: PropTypes.bool
}

class Month extends React.Component {
  constructor (props) {
    super(props)

    this.renderWeeks = this.renderWeeks.bind(this)
  }

  renderWeeks () {
    const { month } = this.props
    console.log(this.props);
    
    return month.map((week) => (
      <WeekContainer key={week.uuid} week={week} /> 
    ))
  }

  render () {
    return (
      <div>
        {this.renderWeeks()}
      </div>
    )
  }
}

Month.propTypes = propTypes

export default Month