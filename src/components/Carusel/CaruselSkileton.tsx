import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const CaruselSkileton: FC = () => {
    return (
        <ContentLoader
            speed={2}
            width={200}
            height={248}
            viewBox="0 0 200 248"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="25" ry="25" width="200" height="249" />
        </ContentLoader>
    );
};

export default CaruselSkileton;
