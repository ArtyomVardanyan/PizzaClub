import { FC, memo } from 'react';

type CategoriesProps = {
    value: number;
    onChangeCategory: (idx: number) => void;
};

const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
    const categories = [
        'Все',
        'Вегетарианская',
        'Мясные',
        'Гриль',
        'Острые',
        'Закрытые',
    ];

    return (
        <div className="categories wrapper">
            <ul>
                {categories.map((categoryName, i) => {
                    return (
                        <li
                            key={i}
                            onClick={() => onChangeCategory(i)}
                            className={value === i ? 'active' : ''}
                        >
                            {categoryName}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});

export default Categories;
