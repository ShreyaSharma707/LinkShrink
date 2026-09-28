import React, { useState } from 'react'
import LoginForm from '../components/LoginForm.jsx'
import RegisterForm from '../components/RegisterForm.jsx'

const AuthPage = () => {

    const [login, setLogin] = useState(true)

    return (
        <div className="page-shell hero-grid flex flex-col items-center justify-center px-5 py-14 sm:px-8">
            {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
        </div>
    )
}

export default AuthPage