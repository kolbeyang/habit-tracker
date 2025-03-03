import { supabaseClient } from "@/lib/supabase/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Habit, HabitCompletion } from "./types";
import { unionBy } from "lodash";

interface HabitState {
  habits: Habit[];
  isHabitsLoading: boolean;
  habitsError: string | null;
  habitCompletions: HabitCompletion[];
  isHabitCompletionsLoading: boolean;
  habitCompletionsError: string | null;
}

const initialState: HabitState = {
  habits: [],
  isHabitsLoading: false,
  habitsError: null,
  habitCompletions: [],
  isHabitCompletionsLoading: false,
  habitCompletionsError: null,
};

export const fetchHabits = createAsyncThunk("habits/fetch", async () => {
  const { data, error } = await supabaseClient.from("habits").select("*");
  if (error) throw new Error(error.message);
  return data;
});

export const fetchHabitCompletions = createAsyncThunk(
  "habit-completions/fetch",
  async ({ start, end }: { start: string; end?: string }) => {
    const { data, error } = await supabaseClient
      .from("habit_completions")
      .select("*")
      .gte("date", start)
      .lte("date", end ?? start);
    if (error) throw new Error(error.message);
    return data;
  },
);

export const createHabit = createAsyncThunk(
  "habits/create",
  async ({ name, description, icon }: Omit<Habit, "id" | "user_id">) => {
    const { data, error } = await supabaseClient
      .from("habits")
      .insert([{ name, description, icon }])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },
);
export const updateHabit = createAsyncThunk(
  "habits/update",
  async (habit: Habit) => {
    const { id } = habit;
    const { data, error } = await supabaseClient
      .from("habits")
      .update([habit])
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0]; // Return updated habit
  },
);
export const deleteHabit = createAsyncThunk(
  "habits/delete",
  async (id: string) => {
    const { error } = await supabaseClient.from("habits").delete().eq("id", id);
    if (error) throw error;
    return id; // Return deleted habit ID
  },
);
export const createHabitCompletion = createAsyncThunk(
  "habit-completions/create",
  async (habitCompletion: Omit<HabitCompletion, "id">) => {
    const { data, error } = await supabaseClient
      .from("habit_completions")
      .insert([habitCompletion])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },
);
export const deleteHabitCompletion = createAsyncThunk(
  "habit-completions/delete",
  async (id: string) => {
    const { error } = await supabaseClient
      .from("habit_completions")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return id; // Return deleted habit ID
  },
);

export const toggleHabitCompletion = createAsyncThunk(
  "habitCompletions/toggle",
  async (
    { habit_id, date }: Omit<HabitCompletion, "id">,
    { dispatch, getState },
  ) => {
    const state = getState() as RootState;
    const existingCompletion = state.habits.habitCompletions.find(
      (hc) => hc.habit_id === habit_id && hc.date === date,
    );

    if (existingCompletion) {
      await dispatch(deleteHabitCompletion(existingCompletion.id));
    } else {
      await dispatch(createHabitCompletion({ habit_id, date }));
    }
  },
);

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.isHabitsLoading = true;
        state.habitsError = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isHabitsLoading = false;
        state.habits = unionBy(action.payload, state.habits, "id");
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.isHabitsLoading = false;
        state.habitsError = action.error.message ?? "Error fetching habits ";
      })
      .addCase(fetchHabitCompletions.pending, (state) => {
        state.isHabitCompletionsLoading = true;
        state.habitCompletionsError = null;
      })
      .addCase(fetchHabitCompletions.fulfilled, (state, action) => {
        state.isHabitCompletionsLoading = false;
        state.habitCompletions = unionBy(
          action.payload,
          state.habitCompletions,
          "id",
        );
      })
      .addCase(fetchHabitCompletions.rejected, (state, action) => {
        state.isHabitCompletionsLoading = false;
        state.habitCompletionsError =
          action.error.message ?? "Error fetching habit completions ";
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        const newHabit = action.payload;
        const newHabits = [...state.habits, newHabit];
        return { ...state, habits: newHabits };
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        const updatedHabit = action.payload;
        const newHabits = state.habits.map((habit) =>
          habit.id === updatedHabit.id ? updatedHabit : habit,
        );
        return { ...state, habits: newHabits };
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        const deletedHabitId = action.payload;
        const newHabits = state.habits.filter(
          (habit) => habit.id !== deletedHabitId,
        );
        return { ...state, habits: newHabits };
      })
      .addCase(createHabitCompletion.fulfilled, (state, action) => {
        const newHabitCompletion = action.payload;
        const newHabitCompletions = [
          ...state.habitCompletions,
          newHabitCompletion,
        ];
        return { ...state, habitCompletions: newHabitCompletions };
      })
      .addCase(deleteHabitCompletion.fulfilled, (state, action) => {
        const deletedHabitCompletionId = action.payload;
        const newHabitCompletions = state.habitCompletions.filter(
          (habitCompletion) => habitCompletion.id !== deletedHabitCompletionId,
        );
        return { ...state, habitCompletions: newHabitCompletions };
      });
  },
});

export const selectHabits = (state: { habits: HabitState }) =>
  state.habits.habits;

export const selectHabitById =
  (habitId: string | undefined) => (state: { habits: HabitState }) =>
    state.habits.habits.find((habit) => habit.id === habitId);

export const selectHabitCompletions = (state: { habits: HabitState }) =>
  state.habits.habitCompletions;

export const selectHabitCompletion =
  (habitId: string, date: string) => (state: { habits: HabitState }) => {
    return state.habits.habitCompletions.find(
      ({ habit_id: checkId, date: checkDate }) =>
        checkId === habitId && checkDate === date,
    );
  };

export const habitActions = habitSlice.reducer;
