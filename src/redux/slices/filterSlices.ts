import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
}

export type Sort = {
    name: string;
    sortProperty: SortPropertyEnum;
};

export type SearchPizzaParams = {
    sortBy: Sort;
    order: string;
    category: string;
    search: string;
};

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    sort: Sort;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    sort: {
        name: 'популярности (DESC)',
        sortProperty: SortPropertyEnum.RATING_DESC,
    },
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.categoryId = Number(action.payload.categoryId);
                state.sort = action.payload.sort;
            } else {
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности (DESC)',
                    sortProperty: SortPropertyEnum.RATING_DESC,
                };
            }
        },
    },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
