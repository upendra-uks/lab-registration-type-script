// store/timezoneSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimezoneState {
  timezone: string;
}

const initialState: TimezoneState = {
  timezone: 'Central America (UTC-06:00)', // Default value
};

const timezoneSlice = createSlice({
  name: 'timezone',
  initialState,
  reducers: {
    setTimezone: (state, action: PayloadAction<string>) => {
      state.timezone = action.payload;
    },
  },
});

export const { setTimezone } = timezoneSlice.actions;

export default timezoneSlice.reducer;
