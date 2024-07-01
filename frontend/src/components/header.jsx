import { NavLink } from "react-router-dom"
import argentBankLogo from '@/assets/argentBankLogo.png'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/slices/authSlice'
import { resetProfile } from '@/slices/profileSlice'

export const Header = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        dispatch(resetProfile())
    }

    return (
        <nav className="main-nav">
            <NavLink className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={argentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div className="side-nav">
                {token && user ?
                    <>
                        <NavLink className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i><h4>{user.firstName}</h4>
                        </NavLink>
                        <NavLink className="main-nav-item" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i>
                            Sign out
                        </NavLink>
                    </>
                    :
                    <NavLink className="main-nav-item" to="/login">
                        <i className="fa fa-sign-in"></i>
                        Sign In
                    </NavLink>
                }
            </div>
        </nav>
    )
}
