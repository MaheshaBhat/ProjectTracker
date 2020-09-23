import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  Signup: undefined;
  Signin: undefined;
  Home: undefined;
};

export type AuthStackParamList = {
  Landing: undefined;
  NotFound: undefined;
  Signup: undefined;
  Signin: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  Projects: undefined;
  Tasks: undefined;
  TabFour: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  ProjectScreen: undefined;
};

export type TabThreeParamList = {
  MyTaskScreen: undefined;
};

export type TabFourParamList = {
  TabFourScreen: undefined;
};

export type AuthScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Signup"
>;
