import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { CompanyReducer } from "./Reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  company: CompanyReducer,
});

const compStore = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default compStore;
