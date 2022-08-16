import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './Carusel.module.scss';
import CaruselSkileton from './CaruselSkileton';

type Carusel = {
    id: string;
    imageUrl: string;
};

const Carusel: FC = () => {
    const [item, setItem] = useState<Carusel[]>();

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get<Carusel[]>(
                'https://629dbda3c6ef9335c0a4a325.mockapi.io/carusel'
            );
            setItem(data); 
        };
        fetchData();
    }, []);    
    
    const skeletons = [...new Array(6)].map((_, index) => (
        <CaruselSkileton key={index} />
    ));

    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={5000}
            centerMode={false}
            className={styles.carusel}
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={20}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024,
                    },
                    items: 6,
                    partialVisibilityGutter: 40,
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0,
                    },
                    items: 3,
                    partialVisibilityGutter: 30,
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464,
                    },
                    items: 2,
                    partialVisibilityGutter: 30,
                },
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={2}
            swipeable
        >
            {item
                ? item.map(({ id, imageUrl }) => (
                      <div key={id}>
                          <img
                              className={styles.item}
                              src={imageUrl}
                              alt="item"
                          />
                      </div>
                  ))
                : skeletons}
        </Carousel>
    );
};

export default Carusel;
