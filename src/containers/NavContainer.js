import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

import moment from 'moment'

import Nav from '../components/Nav'

class NavContainer extends Component {
  render () {
    const { currentMonthIndex, actions } = this.props
    const currentMonthTitle = moment().startOf('month').add(currentMonthIndex, 'month').format('MMMM YYYY')

    return (
      <Nav
        nextMonthAction={actions.nextMonth}
        prevMonthAction={actions.prevMonth}
        currentMonthTitle={currentMonthTitle}
      />
    )
  }
}

const mapStateToProps = state => ({
  currentMonthIndex: state.calendar.currentMonthIndex
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavContainer)