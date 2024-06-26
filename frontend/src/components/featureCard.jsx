export const FeatureCard = ({ title, icon, iconAlt, desc }) => {
    return (
        <div className="feature-item">
            <img src={icon} alt={iconAlt} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{desc}</p>
        </div>
    )
}
