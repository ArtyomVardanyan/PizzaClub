import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkileton: FC = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={468}
        viewBox="0 0 280 468"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="141" cy="135" r="130" />
        <rect x="0" y="283" rx="5" ry="5" width="280" height="25" />
        <rect x="-2" y="326" rx="5" ry="5" width="280" height="84" />
        <rect x="1" y="420" rx="5" ry="5" width="89" height="27" />
        <rect x="128" y="421" rx="21" ry="21" width="151" height="44" />
    </ContentLoader>
);

export default PizzaSkileton;
