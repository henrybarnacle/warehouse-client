import warehouses from '../globalState/warehouses';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    warehouses,
});

export default rootReducer;
