const RoutePaths = {
  HOME: "/",
  CALENDAR_SELECTION: "/calendars",
  CALENDAR: "/calendars/:calendarId",
  LOGIN: "/login"
};

export const LoginSuccessPath = RoutePaths.HOME;
export const LogoutSuccessPath = RoutePaths.LOGIN;

export default RoutePaths;
