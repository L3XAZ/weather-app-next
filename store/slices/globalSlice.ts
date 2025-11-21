import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlertSeverity } from '@/types/ui';

interface AlertState {
    isOpen: boolean;
    severity: AlertSeverity;
    message: string;
}

interface GlobalState {
    alert: AlertState;
}

const initialState: GlobalState = {
    alert: { isOpen: false, severity: AlertSeverity.SUCCESS, message: '' },
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        openAlert: (state, action: PayloadAction<{ severity: AlertSeverity; message: string }>) => {
            state.alert = { ...action.payload, isOpen: true };
        },
        closeAlert: (state) => {
            state.alert = initialState.alert;
        },
    },
});

export const { openAlert, closeAlert } = globalSlice.actions;
export default globalSlice.reducer;
