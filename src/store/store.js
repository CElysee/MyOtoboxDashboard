import { configureStore } from '@reduxjs/toolkit';
import greetingReducer from '../components/features/GreetingsSlice'; // Import the reducer

const store = configureStore({
  reducer: {
    greeting: greetingReducer, // Add the slice reducer to the store
  },
});
export {store};