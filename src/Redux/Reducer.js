import {
  MAKE_REQ,
  OPEN_POPUP,
  REQ_ADD_SUCC,
  REQ_DELETE_SUCC,
  REQ_UPDATE_SUCC,
  REQ_GETALL_SUCC,
  REQ_GETALL_FAIL,
  REQ_GETBYCODE_SUCC,
} from "./ActionType";

export const initialState = {
  isLoading: false,
  teachersList: [],
  teacherObj: {},
  errorMessage: "",
};

export const CompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQ:
      return {
        ...state,
        isLoading: true,
      };

    case REQ_GETALL_SUCC:
      return {
        ...state,
        isLoading: false,
        teachersList: action.payload,
      };

    case REQ_GETBYCODE_SUCC:
      return {
        ...state,
        teacherObj: action.payload,
      };

    case REQ_GETALL_FAIL:
      return {
        ...state,
        isLoading: false,
        teachersList: [],
        errorMessage: action.payload,
      };

    case OPEN_POPUP:
      return {
        ...state,
        teacherObj: {},
      };

    case REQ_ADD_SUCC:
      const inputData = { ...action.payload };
      const maxID = Math.max(...state.teachersList.map((o) => o.id));
      inputData.id = maxID + 1;

      return {
        ...state,
        teachersList: [...state.teachersList, inputData],
      };

    case REQ_UPDATE_SUCC:
      const data = { ...action.payload };
      const finalData = state.teachersList.map((item) => {
        return item.id === data.id ? data : item;
      });

      return {
        ...state,
        teachersList: finalData,
      };

    case REQ_DELETE_SUCC:
      const filterData = state.teachersList.filter((data) => {
        return data.id !== action.payload;
      });

      return {
        ...state,
        teachersList: filterData,
      };

    default:
      return state;
  }
};
