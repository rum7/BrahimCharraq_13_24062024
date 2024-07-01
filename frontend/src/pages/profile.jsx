import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { getUserDetails } from '@/slices/profileSlice'
import { updateUserDetails } from '@/slices/profileSlice'

import { AccountCard } from '@/components/accountCard'
import dataAccount from '@/data/accountContent.json'

export const Profile = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    
    const [firstName, setFirsName] = useState('')
    const [lastName, setLastName] = useState('')


    useEffect(() => {
        if(user) {
            setFirsName(user.firstName)
            setLastName(user.lastName)
        }
    }, [user, dispatch])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(updateUserDetails({ firstName, lastName }))
        await dispatch(getUserDetails(token))
        toggleVisibilityForm()
    }

    const toggleVisibilityForm = () => {
        const form = document.querySelector('.edit-form')
        const btnEdit = document.querySelector('.edit-button')

        if (form.style.display === 'none') {
            form.removeAttribute('style')
            btnEdit.style.display = 'none'
        } else {
            form.style.display = 'none'
            btnEdit.style.display = 'inline-block'
        } 
    }

    if(!user) {
        return <Navigate to='/login' />
    }

    return (
        <>
            <Helmet>
                <title>ARGENTBANK - User</title>
            </Helmet>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />{user.firstName} {user.lastName} !</h1>
                    <button className="edit-button" onClick={toggleVisibilityForm}>Edit Name</button>
                    <form className='edit-form' onSubmit={handleSubmit} style={{ display: "none" }}>
                        <div className="input-wrapper left">
                            <input type="text" id="firstName" value={firstName} onChange={(e) => setFirsName(e.target.value)} required />
                        </div>
                        <div className="input-wrapper right">
                            <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div className='button-wrapper left'>
                            <button className="sign-in-button" type="submit">Save</button>
                        </div>
                        <div className='button-wrapper right'>
                            <button className="sign-in-button" type='button' onClick={toggleVisibilityForm}>Cancel</button>
                        </div>
                    </form>
                </div>
                <h2 className="sr-only">Accounts</h2>
                {dataAccount.map((item) => (
                    <AccountCard 
                        key={item.id}
                        title={item.title}
                        amount={item.amount}
                        desc={item.desc}
                    />
                ))}
            </main>
        </>
    )
}