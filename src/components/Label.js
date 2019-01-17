import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  text: PropTypes.string,
  category: PropTypes.string,
  handleClick: PropTypes.func.isRequired
}

function Label ({ text, category, handleClick }) {
  const labelClassList = ['reminder__label button a4']
  if (category === 'soon') labelClassList.push('reminder__label--work')
  if (category === 'urgent') labelClassList.push('reminder__label--calendar')

  if (text === '') {
    text = 'Reminder'
  }

  return (
    <div
      className={labelClassList.join(' ')}
      onClick={handleClick}
    >
      {text}
    </div>
  )
}

Label.propTypes = propTypes

export default Label
