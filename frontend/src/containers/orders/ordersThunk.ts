import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder2, ValidationError } from '@/type';
import axiosApi from '@/axiosApi';
import { isAxiosError } from 'axios';

export const fetchOrders = createAsyncThunk<IOrder2[], void | string>(
  'orders/fetchAll',
  async () => {
    const response = await axiosApi.get<IOrder2[]>('/orders');
    return response.data;
  },
);

export const deleteOrder = createAsyncThunk<
  void,
  string,
  { rejectValue: ValidationError }
>('orders/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete(`/orders/${id}`);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});