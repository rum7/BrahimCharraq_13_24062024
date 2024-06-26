import { Helmet } from 'react-helmet-async'
import { FeatureCard } from "@/components/featureCard"
import dataFeatures from '@/data/featuresList.json'

export const Home = () => {
    return (
        <>
            <Helmet>
                <title>ARGENTBANK - Home</title>
            </Helmet>
            <main>
                <div className="hero">
                    <section className="hero-content">
                        <h2 className="sr-only">Promoted Content</h2>
                        <p className="subtitle">No fees.</p>
                        <p className="subtitle">No minimum deposit.</p>
                        <p className="subtitle">High interest rates.</p>
                        <p className="text">Open a savings account with Argent Bank today!</p>
                    </section>
                </div>
                <section className="features">
                    <h2 className="sr-only">Features</h2>
                    {dataFeatures.map(item => (
                        <FeatureCard
                            key={item.id}
                            title={item.title}
                            icon={item.icon}
                            iconAlt={item.iconAlt}
                            desc={item.desc}
                        />
                    ))}
                </section>
            </main>
        </>
    )
}
