import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './assets/index.css';
import App from './containers/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  user_id: null,
  activeUser: null,
  activeEvent: null,
  performerList: [],
  currentLocation: '/',
  video_url: undefined,
  video_id: undefined,
  token: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, activeUser: action.payload.user};
    case 'SET_USER_ID':
      return {...state, user_id: action.payload.user_id};
    case 'ACTIVE_EVENT':
      return {...state, activeEvent: action.payload.event};
    case 'LOGOUT':
      return {...state, activeUser: action.payload.user};
    case 'SET_LOCATION':
      return {...state, currentLocation: action.payload.currentLocation};
    case 'VIDEO_FORM_SELECTION':
      return {...state, video_id: action.payload.video_id, video_url: action.payload.video_url};
    case 'ADD_PERFORMER_TO_LIST':
      return {...state, performerList: [...state.performerList, action.payload.performer]};
    case 'LOAD_PERFORMERS':
      return {...state, performerList: action.payload.performerList};
    case 'RESET_STORE':
      return {...state, performerList: initialState.performerList, video_url: initialState.video_url, video_id: initialState.video_id};
    case 'RESET_APP':
      console.log('state:', state);
      console.log('action:', action);
      return { initialState };
    case 'RESET_ACTIVE_EVENT':
      return {...state, activeEvent: null};
    case 'SET_TOKEN':
      return {...state, token: action.payload.token};
    default:
      return state;
  }
};

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));