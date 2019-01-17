export function addReminder(weekIndex, weekdayIndex) {
  return {
    type: 'ADD_REMINDER',
    payload: {
      weekIndex,
      weekdayIndex
    }
  }
}

export function removeReminder(weekIndex, weekdayIndex, reminder) {
  return {
    type: 'REMOVE_REMINDER',
    payload: {
      weekIndex,
      weekdayIndex,
      reminder
    }
  }
}

export function updateReminder(weekIndex, weekdayIndex, reminder) {
  return {
    type: 'UPDATE_REMINDER',
    payload: {
      weekIndex,
      weekdayIndex,
      reminder
    }
  }
}

export function nextMonth() {
  return {
    type: 'NEXT_MONTH'
  }
}

export function prevMonth() {
  return {
    type: 'PREV_MONTH'
  }
}