import { combineReducers, configureStore } from '@reduxjs/toolkit';

/** CALL REDUCERS */

import questionReducer from './questionReducer'
import resultReducer from './resultReducer';

const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer
})

/** CREATE STORE WITH REDUCER */
export default configureStore({ reducer : rootReducer})