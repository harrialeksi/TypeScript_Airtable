import { studentConstants } from '../constants';

interface student {
  name: string,
  classes: [],
  loading: boolean
}

const initial_state: student = {
  name: '',
  classes: [],
  loading: false
};

export function students(state = initial_state, action) {
  switch (action.type) {
    case studentConstants.SET_STUDENT:
      return {
        name: action.name,
        classes: [],
        loading: true
      };
    case studentConstants.SET_CLASSES:
      return {
        ...state,
        classes: action.records,
        loading: false
      };
    case studentConstants.LOGOUT:
      return {
        name: '',
        classes: [],
      };
    default:
      return state;
  }
}
