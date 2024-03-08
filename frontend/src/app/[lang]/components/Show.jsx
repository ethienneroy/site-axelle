import React, {Children} from 'react';

const Show = (props) => {
  let when, otherwise = null
  Children.forEach(props.children, child => {
    if(!!child.props.isTrue) {
      otherwise = child
    } else if(!when && !!child.props.isTrue) {
      when = child
    }
  })
  return when || otherwise
};
Show.When = ({isTrue, children}) => isTrue && children;
Show.Else = ({render, children}) => render || children;

export default Show;