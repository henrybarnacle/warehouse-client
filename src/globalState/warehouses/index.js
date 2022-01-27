import { listService } from '../../service/listService';

const globalRoot = 'app/warehouses/';

// Constants
export const GET_ITEMS = `${globalRoot}GET_ITEMS`;
export const REMOVE_ITEM = `${globalRoot}REMOVE_ITEM`;
export const SELECT_ITEM  = `${globalRoot}SELECT_ITEM`;
export const EDIT_ITEM = `${globalRoot}EDIT_ITEM`;
export const SHOW_DELETE = `${globalRoot}SHOW_DELETE`;
export const SHOW_EDIT = `${globalRoot}SHOW_EDIT`;

export const initialState = {
    list: [],
    selectedItem: null,
    deleteVisible: false,
    editVisible: false
  };

// Reducer
  export default function reducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ITEMS:
        return { ...state, list: payload.data }

      case REMOVE_ITEM:
        const editedList = state.list.filter(item => item.id !== payload);
        console.log(editedList);
        return { ...state, list: [...editedList] }

      case SELECT_ITEM:
          return { ...state, selectedItem: payload }

      case SHOW_DELETE:
        return { ...state, deleteVisible: payload }

      case SHOW_EDIT:
        return { ...state, editVisible: payload }

      case EDIT_ITEM:
        return {...state, selectedItem: null};
  
      default:
        return state;
    }
  };

 // Action Creators
export const getItems = () => async dispatch => {
  const response = await listService.get('/warehouses');
  dispatch({ type: GET_ITEMS, payload: response })
};
export const removeItem = (id) => async dispatch => {
  const response = await listService.delete(`/warehouses/${id}`);
  dispatch({type: REMOVE_ITEM, payload: id})
};
export const editItem = (formValues) => async dispatch => {
  console.log(formValues)
  const response = await listService.put(`/warehouses/${formValues.id}`, formValues).then(() => getItems());
  dispatch({type: EDIT_ITEM, payload: response});
};
export const selectItem = (item) => ({
  type: SELECT_ITEM,
  payload: item,
});
export const showDelete = (show) => ({
  type: SHOW_DELETE,
  payload: show,
});
export const showEdit = (show) => ({
  type: SHOW_EDIT,
  payload: show,
});