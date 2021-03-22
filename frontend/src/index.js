import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import * as reducers from './store/reducers/reducers';
import { loadState, saveState } from './store/localStorage';

const persistedState = loadState();

const rootReducer = combineReducers({
  login: reducers.userLoginReducer,
  userRegistration: reducers.userRegistrationReducer,
  createCategory: reducers.categoryCreationReducer,
  listUsers: reducers.listUsersReducer,
  reportedAnswers: reducers.reportedAnswersReducer,
  category: reducers.categoriesReducer,
  questions: reducers.questionsReducer,
  navbar: reducers.navbarReducer,
  userDetails: reducers.userDetailsReducer,
  contactDetails: reducers.contactDetailsReducer,
  studentDetails: reducers.studentDetailsReducer,
  facultyDetails: reducers.facultyDetailsReducer,
  answers: reducers.answersReducer,
});

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveState({
    login: store.getState().login,
    category: store.getState().category,
    questions: store.getState().questions,
  });
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
