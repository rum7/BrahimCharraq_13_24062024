import { Helmet } from 'react-helmet-async'
import { AccountCard } from '@/components/accountCard'
import dataAccount from '@/data/accountContent.json'

export const User = () => {
    return (
        <>
            <Helmet>
                <title>ARGENTBANK - User</title>
            </Helmet>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />Tony Jarvis!</h1>
                    <button className="edit-button">Edit Name</button>
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