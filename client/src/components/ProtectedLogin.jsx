import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";

const ProtectedLogin = (props) => {
    const user = useSelector(state => state.user.value);

    if(user.isLogin) {
        return <Navigate to="/content"/>
    }else{
        return props.children;
    }
}

export default ProtectedLogin