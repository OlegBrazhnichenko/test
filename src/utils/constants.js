import { Platform } from "react-native";

export const DrawerHeight = undefined; // this was resolved to `undefined`
export const NavBarMargin = Platform.OS === "ios" ? 44 : 44;
export const NavBarHeight = Platform.OS === "ios" ? 64 : 44;
export const StatusBarHeight = Platform.OS === "ios" ? 20 : 0;

// Font size
export const HeaderFontSize = 19;
export const BodyTextHeaderFontSize = 16;
export const ButtonFontSize = 15;
export const SmallFontSize = 11;

// Color
export const LIGHT_GRAY = "#F4F9FC";
export const BLUE = "#238c85";
export const GREEN = "#238c85";
export const LIGHT_PURPLE = "#274762";
export const DARK_GRAY = "#5A5A5A";
export const GRAY = "#A3A3A3";
export const MAIN_BG = "#f4f9fc";
export const MAIN_COLOR = "#75e2d1";

//URL
// export const BASE_URL = "http://3.84.119.206/wayts/index.php/v1/";
export const BASE_URL = "http://18.223.143.174/api/";
export const LOGIN_URL = BASE_URL+"login";
export const PROFILE_URL = BASE_URL+"profile";
export const SIGNUP_URL = BASE_URL+"signup";
export const GET_WASTES = BASE_URL+"wastes";
export const GET_BUSINESS_TYPES = BASE_URL+"businesses";
export const POST_LISTING = BASE_URL+"listings";
export const GET_LISTINGS = BASE_URL+"listings";
export const CLAIM_LISTING = BASE_URL+"listings/";
export const LOGOUT = BASE_URL+'logout';
export const SEND_SMS = BASE_URL+'user/phone/sendsms';
export const CONFIRM_CODE  = BASE_URL+'user/phone/confirm';


// Error Message
const constant = {
  SERVER_ERROR_MESSAGE: "The request failed due to an internal error.",
  OFFLINE_TITLE: "No Internet Connection",
  OFFLINE_MESSAGE: "Please check your internet connection.",
  EMPTY_RECORD_MESSAGE: "Record Not Found."
};

export default constant;
