import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { extendedApiSlice } from './reducxSlices/inspirationsSlice';
/* import { extendedNotificationsApiSlice } from './reducxSlices/notificationsSlice';
import { extendedNotificationsCounterApiSlice } from './reducxSlices/notificationCounterSlice'; */
import { extendedProfilesApiSlice } from './reducxSlices/profilesSlice';
import { extendedLikesApiSlice } from './reducxSlices/likesSlice';
import { extendedBokmarkApiSlice } from './reducxSlices/bookmarksSlice';
import { extendedInspirersApiSlice } from './reducxSlices/inspirersSlice';
import { extendedCommentsApiSlice } from './reducxSlices/commentsSlice';

store.dispatch(extendedApiSlice.endpoints.getInspirations.initiate());
/* store.dispatch(extendedNotificationsApiSlice.endpoints.getNotifications.initiate())
store.dispatch(extendedNotificationsCounterApiSlice.endpoints.getNotificationsCounter.initiate()) */
store.dispatch(extendedProfilesApiSlice.endpoints.getProfiles.initiate())
store.dispatch(extendedLikesApiSlice.endpoints.getLikes.initiate())
store.dispatch(extendedBokmarkApiSlice.endpoints.getBookmarks.initiate())
store.dispatch(extendedInspirersApiSlice.endpoints.getInspirers.initiate())
store.dispatch(extendedCommentsApiSlice.endpoints.getComments.initiate())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
