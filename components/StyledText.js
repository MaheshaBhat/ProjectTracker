/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Text, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 393;
//const guidelineBaseHeight = 680;
const scale = size => (width / guidelineBaseWidth) * size;
//const verticalScale = size => height / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.8) => Math.round(size + (scale(size) - size) * factor);

class StyledText extends React.Component {
  constructor(props) {
    super(props);
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    Text.defaultProps.style = Text.defaultProps.style || {};
  }
  render() {
  
    const props = this.props;
    let style = props.style;
    if (props.style.length > 1) {
      style = Object.assign({}, ...props.style);
    }
    const fz = (style.fontSize != undefined ? style.fontSize : 14);
    const fontSize = moderateScale(fz);
    // eslint-disable-next-line max-len
    //const fm = (style && ((style.fontFamily !== 'DINPro-medium') ? (style.fontWeight === 'bold' ? 'DINPro-bold' : 'DINPro') : 'DINPro-medium')) || 'DINPro';
    return (
      // eslint-disable-next-line max-len
      <Text {...props} style={[props.style, { fontSize, 
        //fontFamily: fm, 
        fontWeight: 'normal' }]} onPress={this.props.onPress} />
      //fontSize: props.style.fontSize ? moderateScale(props.style.fontSize) : 11
      //fontSize: props.style.fontSize ? RFValue(props.style.fontSize, 750) : 13 }]} />
    );
  }
}

export default StyledText;
