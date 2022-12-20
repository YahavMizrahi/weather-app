import React from 'react'

function Form({ children, changeHandler, submitHandler }) {
  return (
    <form onSubmit={ submitHandler} onChange={changeHandler}>
      {children}
    </form>
  );
}

export default Form