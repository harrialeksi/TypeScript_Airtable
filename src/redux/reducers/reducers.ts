import { combineReducers } from 'redux';

import { students } from './student';

const rootReducer = combineReducers({ students });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
