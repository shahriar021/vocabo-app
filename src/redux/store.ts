import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./createdApi/baseApi";
import authReducer from "./features/auth/authSlice";
import pickerReducer from "./features/picker/pickerSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "redux";

// Persist Configurations
const authPersistConfig = {
  key: "dormitory-auth",
  storage: AsyncStorage,
};

const notificationPersistConfig = {
  key: "dormitory-notification",
  storage: AsyncStorage,
};

// Persisted Reducers
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  picker: pickerReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

// Configure Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }).concat(
      baseApi.middleware,
    ),
});

// Persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
