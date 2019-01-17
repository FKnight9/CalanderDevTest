import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

import Week from '../components/Week'

const mapStateToProps = (state) => ({
  month: state.calendar.month,
  currentMonthIndex: state.calendar.currentMonthIndex
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Week)