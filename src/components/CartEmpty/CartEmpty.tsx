import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImg from '../../assets/img/empty-cart.png';
import styles from './CartEmpty.module.scss';
import Emoji1 from '../../assets/img/emojies/emoji1.png';
import Emoji2 from '../../assets/img/emojies/emoji2.png';
import Emoji3 from '../../assets/img/emojies/emoji3.png';

const CartEmpty: FC = () => {
    const [item, setItem] = useState<string>(Emoji3);
    const items = [Emoji1, Emoji2, Emoji3];
    useEffect(() => {
        setItem(items[Math.floor(Math.random() * items.length)]);
    }, []);

    return (
        <div className="cart cart--empty">
            <h2 className={styles.title}>
                Корзина пустая
                <span>
                    &nbsp;
                    <img src={item} alt="emoji" className={styles.emoji} />
                </span>
            </h2>
            <p>
                Вероятней всего, вы не заказывали ещё пиццу.
                <br />
                Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={cartEmptyImg} className="image" />
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    );
};

export default CartEmpty;
