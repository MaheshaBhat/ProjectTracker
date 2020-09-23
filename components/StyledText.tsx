/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as React from 'react';

import { Text, TextProps } from './Themed';

export default function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Roboto' }]} />;
}
