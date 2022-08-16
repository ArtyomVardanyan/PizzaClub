import { useRef, useEffect, FC, useCallback } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkileton from '../components/PizzaBlock/PizzaSkileton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Carusel from '../components/Carusel';
import { sortList } from '../components/Sort';

import {
    SearchPizzaParams,
    selectFilter,
    setCategoryId,
    setFilters,
} from '../redux/slices/filterSlices';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlices';
import { useAppDispatch } from '../redux/store';

const Home: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, searchValue, sort } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzaData);

    const onChangeCategory = useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, []);

    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
            })
        );
    };

    // Если изменили параметры и был первый рендер
    // useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //         });

    //         navigate(`?${queryString}`);
    //     }
    //     isMounted.current = true;
    // }, [categoryId, sort.sortProperty]);

    // Парсим параметры при первом рендере
    // React.useEffect(() => {
    //   if (window.location.search) {
    //       const params = qs.parse(
    //           window.location.search.substring(1)
    //       ) as unknown as SearchPizzaParams;
    //       // || sorty esem poxe
    //       const sort = sortList.find(obj => obj === params.sortBy);
    //       dispatch(
    //           setFilters({
    //               searchValue: params.search,
    //               // || 0 es em avelcre
    //               categoryId: Number(params.category) || 0,
    //               sort: sort || sortList[0],
    //           })
    //       );
    //   }
    //   isMounted.current = true;
    // }, []);

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue]);

    const pizzas = items.map((obj: any) => (
        <PizzaBlock key={obj.id} {...obj} />
    ));

    const skeletons = [...new Array(8)].map((_, index) => (
        <PizzaSkileton key={index} />
    ));

    return (
        <div className="container">
            <Carusel />
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort value={sort} />
            </div>

            <h2 className="content__title">Все пиццы</h2>

            <div className="content__items">
                {status === 'loading' ? skeletons : pizzas} 
            </div>
        </div>
    );
};

export default Home;
