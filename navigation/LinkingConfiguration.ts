import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Landing: 'Landing',
      Signup:"Signup",
      Signin:"Signin",
      Home:"Home",
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          TabThree: {
            screens: {
              TabThreeScreen: 'three',
            },
          },
          TabFour: {
            screens: {
              TabFourScreen: 'four',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
