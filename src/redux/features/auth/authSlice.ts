import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FirebaseUserInfo } from "src/types/profile";

export type TUser = {

  access_token: string;
  address: string | null;
  api_token: string;
  branch_id: number | null;
  company_id: number;
  created_at: string; // ISO date string
  created_by: number | null;
  device_token: string | null;
  email: string;
  email_verified_at: string; // ISO date string
  employee_full_id: string | null;
  id: number;
  name: string;
  password_reset_token: string | null;
  phone_number: string | null;
  role_id: number | null;
  status: number;
  type: string | null;
  updated_at: string; // ISO date string

};

export type TCredentials = {
  email: string;
  password: string;
};

type TAuthData = {
  user: null | TUser;
  id: null | string;
  credentials: null | TCredentials;
  profile: null;
  companyAuth: null | string;
  EXPO_PUBLIC_BASE_URL: string | null;
  userType: string | null;
  token: string | null
  loading: boolean;
  userInfo: FirebaseUserInfo | null
};

const initialState: TAuthData = {
  user: null,
  id: null,
  credentials: null,
  profile: null,
  companyAuth: null,
  EXPO_PUBLIC_BASE_URL: null,
  userType: null,
  token: null,
  loading: false,
  userInfo:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, credentials } = action.payload;
      state.user = user;
      state.credentials = credentials;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setCompanyAuth: (state, action) => {
      state.companyAuth = action.payload;
    },
    setBaseUrl: (state, action) => {
      state.EXPO_PUBLIC_BASE_URL = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setCamLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserInfo:(state, action: PayloadAction<FirebaseUserInfo | null>)=>{
      state.userInfo=action.payload
    }
  },
});

export const { setUser, setCompanyAuth, setBaseUrl, setUserType, setToken, setId, setCamLoading,setUserInfo } = authSlice.actions;
export default authSlice.reducer;