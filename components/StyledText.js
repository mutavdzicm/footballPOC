import * as React from 'react';
import { Text } from 'react-native';

export function HelveticaText(props) {
  return <Text {...props} style={[props.style, { fontFamily: "helvetica", color: "#707070" }]} />;
}
