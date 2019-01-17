import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

import Month from '../components/Month'

const mapStateToProps = state => ({
  month: state.calendar.month,
  currentMonthIndex: state.calendar.currentMonthIndex
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Month)