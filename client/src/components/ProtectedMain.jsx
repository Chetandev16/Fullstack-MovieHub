import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

const ProtectedMain = (props) => {
  const user = useSelector(state => state.user.value);
  if (user.isLogin) {
    return props.children;
  } else {
    return (
      <Navigate to="/login" />
    )
  }
}

export default ProtectedMain