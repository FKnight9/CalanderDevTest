import moment from 'moment'
import uuidv1 from 'uuid/v1'

const createCalendarMonth = (startWeek, endWeek) => {
  const monthArray = []
  for (
    let weekIndex = startWeek, weekArrayIndex = 0;
    weekIndex <= endWeek;
    weekIndex++, weekArrayIndex++
    ) {
    const Uuid = uuidv1()

    monthArray.push({
      uuid: Uuid,
      weekIndex,
      index: weekArrayIndex,
      days:
        Array(7)
        .fill({ id: 0 })
        .map((item, index) => {
          return {
            uuid: uuidv1(),
            parentUuid: Uuid,
            date: moment() 
              .week(weekIndex) 
              .startOf('week') 
              .clone() 
              .add(index, 'day'),
              weekIndex,
              index: index,
              reminders: []
          }
        })
    })
  }
  return monthArray
}

const initialStartWeek = moment().startOf('month').week()
const initialEndWeek = moment().endOf('month').week()
const currentMonth = createCalendarMonth(initialStartWeek, initialEndWeek)

// Initial State
const initialState = {
  currentMonthIndex: 0,
  month: currentMonth,
  year: { 0: currentMonth },
  yearCount: 0
}

export default function calendarReducer (state = initialState, action) {
  switch (action.type) {
    case 'ADD_REMINDER': {
      const updatedMonth = state.month.map((week, index) => {
        if (action.payload.weekIndex === index) {
          const dayToUpdate = week.days[action.payload.weekdayIndex]

          dayToUpdate.reminders.push({
            text: '',
            date: moment(),
            category: 'home',
            open: true,
            newReminder: true,
            uuid: uuidv1(),
            parentDayUuid: week.days[action.payload.weekdayIndex].uuid,
            grandparentUuid: week.uuid
          })
        }

        return week
      })

      return {
        ...state,
        month: updatedMonth
      }
    }
    case 'REMOVE_REMINDER': {
      const updatedMonth = state.month.map((week, index) => {
        if (action.payload.weekIndex === index) {
          const dayToUpdate = week.days[action.payload.weekdayIndex]
          dayToUpdate.reminders = dayToUpdate.reminders.filter(reminder => reminder.uuid !== action.payload.reminder.uuid)
        }

        return week
      })

      return {
        ...state,
        month: updatedMonth
      }
    }
    case 'UPDATE_REMINDER': {
      const updatedMonth = state.month.map((week, index) => {
        if (action.payload.weekIndex !== index) {
          return week
        }

        const dayToUpdate = week.days[action.payload.weekdayIndex]
        console.log(week);
        dayToUpdate.reminders = dayToUpdate.reminders.map((reminder) => {
          console.log(reminder)
          console.log(action.payload.reminder);
          if (reminder.uuid !== action.payload.reminder.uuid) {
            return reminder
          }

          let reminders = {
            ...reminder,
            ...action.payload.reminder,
            updateTime: moment()
          }
          
          return {...reminders}
        })

        return week
      })

      return {
        ...state,
        month: updatedMonth
      }
    }
    case 'NEXT_MONTH': {
      const nextMonthIndex = state.currentMonthIndex + 1
      const updatedStartWeek = moment().startOf('month').add(nextMonthIndex, 'month').week()
      let updatedEndWeek
      if (updatedStartWeek >= 48) {
        state.yearCount++
        updatedEndWeek = 53
      } else {
        updatedEndWeek = moment().endOf('month').add(nextMonthIndex, 'month').week()
      }

      const updatedYearCalendar = {
        ...state.year,
        [state.currentMonthIndex]: state.month,  // Save the current month
        [nextMonthIndex]: state.year[nextMonthIndex] ?  state.year[nextMonthIndex] : createCalendarMonth(updatedStartWeek, updatedEndWeek)
      }

      return {
        ...state,
        currentMonthIndex: nextMonthIndex,
        month: updatedYearCalendar[nextMonthIndex],
        year: updatedYearCalendar
      }
    }
    case 'PREV_MONTH': {
      const prevMonthIndex = state.currentMonthIndex - 1
      let updatedStartWeek = moment().startOf('month').add(prevMonthIndex, 'month').week()
      let updatedEndWeek
      if (updatedStartWeek >= 48) {
        state.yearCount--
        updatedEndWeek = 53
        if (updatedStartWeek === 48 ) updatedStartWeek = 49
      } else {
        updatedEndWeek = moment().endOf('month').add(prevMonthIndex, 'month').week()
      }
      const updatedYearCalendar = {
        ...state.year,
        [state.currentMonthIndex]: state.month,
        [prevMonthIndex]: state.year[prevMonthIndex] ?  state.year[prevMonthIndex] : createCalendarMonth(updatedStartWeek, updatedEndWeek)
      }

      return {
        ...state,
        currentMonthIndex: prevMonthIndex,
        month: updatedYearCalendar[prevMonthIndex],
        year: updatedYearCalendar
      }
    }
    default:
      return state
  }
}