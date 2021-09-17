import React from 'react';

const ErrorMessage = props => {
  console.log(props);
  return (
    <div>
      {
        props.errorMessage ?
          (alert(props.errorMessage))
          : ("")
      }
    </div>
  )
};

export default ErrorMessage;
