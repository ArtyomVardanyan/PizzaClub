import { CartItem } from './cartSlices';
import { RootState } from './../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://629dbda3c6ef9335c0a4a325.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}&${search}`
        );
        return data;
    }
);

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

interface PizzaSliceState {
    items: Pizza[];
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
};

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
            state.status = Status.SUCCESS;
    }),
    builder.addCase(fetchPizzas.pending, (state, action) => {
        state.items = [];
            state.status = Status.LOADING;
    }),
    builder.addCase(fetchPizzas.rejected, (state) => {
        state.items = [];
            state.status = Status.ERROR;
    })
  }
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;