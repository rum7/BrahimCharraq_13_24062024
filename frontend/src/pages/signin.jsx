import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { loginUser } from '@/slices/authSlice'
import { getUserDetails } from '@/slices/profileSlice'

export const Signin = () => {
    const dispatch = useDispatch()
    const { token, loading, error } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(token && !user) {
          dispatch(getUserDetails(token))
        }
    }, [token, user, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(loginUser({ email, password }))
    }    

    if(user) {
        return <Navigate to='/profile' />
    }

    return (
        <>
            <Helmet>
                <title>ARGENTBANK - Sign in</title>
            </Helmet>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="sign-in-button" type="submit" disabled={loading}>
                            {loading ? 'Loggin in...' : 'Sign In'}
                        </button>
                    </form>
                    {error && <p>Les informations requises sont incorrectes</p>}
                </section>
            </main>
        </>
    )
}
