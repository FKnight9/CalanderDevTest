import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  currentMonthTitle: PropTypes.string.isRequired,
  nextMonthAction: PropTypes.func.isRequired,
  prevMonthAction: PropTypes.func.isRequired
}

function Nav ({ currentMonthTitle, nextMonthAction, prevMonthAction }) {
  return (
    <div className='calendar__nav'>
      <button className="button a3" onClick={prevMonthAction}>🡄</button>
      <h2>
        {currentMonthTitle}
      </h2>
      <button className="button a3" onClick={nextMonthAction}>🡆</button>
    </div>
  )
}

Nav.propTypes = propTypes

export default Nav