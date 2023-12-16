import { IGuideFull, IGuideRequest } from '@/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '@/store/store';
import {
  becomeGuide,
  createGuide,
  deleteGuideOrder,
  fetchAdminGuides,
  fetchGuideOrders,
  fetchGuides,
  fetchOneGuideOrder,
  fetchGuide,
  fetchAdminGuides,
  deleteGuide,
  fetchGuideNameByFilter,
} from '@/containers/guides/guidesThunk';

interface guidesState {
  guides: IGuideFull[];
  guide: IGuideFull | null;
  guideOrders: IGuideRequest[];
  oneGuideOrder: IGuideRequest | null;
  fetchAllLoading: boolean;
  fetchOneLoading: boolean;
  fetchAdminGuidesLoading: boolean;
  fetchAllOrdersLoading: boolean;
  guideRequestLoading: boolean;
  createGuideLoading: boolean;
  deleteLoading: boolean | string;
  deleteOrderLoading: boolean | string;
  fetchOneOrderLoading: boolean;
}

const initialState: guidesState = {
  guides: [],
  guide: null,
  guideOrders: [],
  oneGuideOrder: null,
  fetchAllLoading: false,
  fetchOneLoading: false,
  fetchAdminGuidesLoading: false,
  fetchAllOrdersLoading: false,
  guideRequestLoading: false,
  createGuideLoading: false,
  deleteLoading: false,
  deleteOrderLoading: false,
  fetchOneOrderLoading: false,
};

export const guidesSlice = createSlice({
  name: 'guides',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase<typeof HYDRATE, PayloadAction<RootState, typeof HYDRATE>>(
      HYDRATE,
      (state, action) => {
        return { ...state, ...action.payload.tours };
      },
    );

    builder.addCase(fetchGuides.pending, (state) => {
      state.fetchAllLoading = true;
    });
    builder.addCase(fetchGuides.fulfilled, (state, { payload: guides }) => {
      state.guides = guides;
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchGuides.rejected, (state) => {
      state.fetchAllLoading = false;
    });
    builder.addCase(fetchAdminGuides.pending, (state) => {
      state.fetchAdminGuidesLoading = true;
    });
    builder.addCase(
      fetchAdminGuides.fulfilled,
      (state, { payload: guides }) => {
        state.guides = guides;
        state.fetchAdminGuidesLoading = false;
      },
    );
    builder.addCase(fetchAdminGuides.rejected, (state) => {
      state.fetchAdminGuidesLoading = false;
    });
    builder.addCase(fetchGuide.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchGuide.fulfilled, (state, { payload: guide }) => {
      state.fetchOneLoading = false;
      state.guide = guide;
    });
    builder.addCase(fetchGuide.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(fetchGuideNameByFilter.pending, (state) => {
      state.fetchAdminGuidesLoading = true;
    });
    builder.addCase(
      fetchGuideNameByFilter.fulfilled,
      (state, { payload: tours }) => {
        state.guides = tours;
        state.fetchAdminGuidesLoading = false;
      },
    );
    builder.addCase(fetchGuideNameByFilter.rejected, (state) => {
      state.fetchAdminGuidesLoading = false;
    });
    builder.addCase(becomeGuide.pending, (state) => {
      state.guideRequestLoading = true;
    });
    builder.addCase(becomeGuide.fulfilled, (state) => {
      state.guideRequestLoading = false;
    });
    builder.addCase(becomeGuide.rejected, (state) => {
      state.guideRequestLoading = false;
    });
    builder.addCase(createGuide.pending, (state) => {
      state.createGuideLoading = true;
    });
    builder.addCase(createGuide.fulfilled, (state) => {
      state.createGuideLoading = false;
    });
    builder.addCase(createGuide.rejected, (state) => {
      state.createGuideLoading = false;
    });

    builder.addCase(fetchOneGuideOrder.pending, (state) => {
      state.fetchOneOrderLoading = true;
    });
    builder.addCase(
      fetchOneGuideOrder.fulfilled,
      (state, { payload: oneGuideOrder }) => {
        state.fetchOneOrderLoading = false;
        state.oneGuideOrder = oneGuideOrder;
      },
    );
    builder.addCase(fetchOneGuideOrder.rejected, (state) => {
      state.fetchOneOrderLoading = false;
    });

    builder.addCase(fetchGuideOrders.pending, (state) => {
      state.fetchAllOrdersLoading = true;
    });
    builder.addCase(
      fetchGuideOrders.fulfilled,
      (state, { payload: guideOrders }) => {
        state.guideOrders = guideOrders;
        state.fetchAllOrdersLoading = false;
      },
    );
    builder.addCase(fetchGuideOrders.rejected, (state) => {
      state.fetchAllOrdersLoading = false;
    });

    builder.addCase(deleteGuideOrder.pending, (state, action) => {
      state.deleteOrderLoading = action.meta.arg;
    });
    builder.addCase(deleteGuideOrder.fulfilled, (state) => {
      state.deleteOrderLoading = false;
    });
    builder.addCase(deleteGuideOrder.rejected, (state) => {
      state.deleteOrderLoading = false;
    builder.addCase(deleteGuide.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteGuide.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteGuide.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const guidesReducer = guidesSlice.reducer;
export const selectGuides = (state: RootState) => state.guides.guides;
export const selectFetchGuidesLoading = (state: RootState) =>
  state.guides.fetchAllLoading;
export const selectOneGuide = (state: RootState) => state.guides.guide;
export const selectGuideLoading = (state: RootState) =>
  state.guides.fetchOneLoading;
export const selectGuideRequestLoading = (state: RootState) =>
  state.guides.guideRequestLoading;
export const selectCreateGuideLoading = (state: RootState) =>
  state.guides.createGuideLoading;

export const selectGuideOrders = (state: RootState) => state.guides.guideOrders;
export const selectFetchGuideOrdersLoading = (state: RootState) =>
  state.guides.fetchAllOrdersLoading;
export const selectDeleteGuideOrderLoading = (state: RootState) =>
  state.guides.deleteOrderLoading;
export const selectOneGuideOrder = (state: RootState) =>
  state.guides.oneGuideOrder;

export const selectOneGuideOrderLoading = (state: RootState) =>
  state.guides.fetchOneOrderLoading;

export const selectAdminGuides = (state: RootState) => state.guides.guides;
