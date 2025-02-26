// store/habitSlice.ts
import { supabaseClient } from "@/lib/supabase/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Friend, User } from "./types";

// Define the initial state for habits
interface UsersState {
  users: User[];
  friends: Friend[];
  isFetchFriendsLoading: boolean;
  fetchFriendsError: string | null;
  isSearchUsersLoading: boolean;
  searchUsersError: string | null;
}

const initialState: UsersState = {
  users: [],
  friends: [],
  isFetchFriendsLoading: false,
  isSearchUsersLoading: false,
  fetchFriendsError: null,
  searchUsersError: null,
};

export const fetchFriendsOfUser = createAsyncThunk(
  "users/friends/fetch",
  async (userId: string) => {
    const { data, error } = await supabaseClient
      .from("friends")
      .select("*")
      .or(`source_user_id.eq.${userId},target_user_id.eq.user_${userId}`);
    if (error) throw new Error(error.message);
    return data as Friend[];
  },
);

export const searchUsers = createAsyncThunk(
  "users/search",
  async (searchQuery: string) => {
    const { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .ilike("display_name", `%${searchQuery}%`);
    return data as User[];
  },
);

const usersSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendsOfUser.pending, (state) => {
        state.isFetchFriendsLoading = true;
        state.fetchFriendsError = null;
      })
      .addCase(fetchFriendsOfUser.fulfilled, (state, action) => {
        state.isFetchFriendsLoading = false;
        state.friends = action.payload;
      })
      .addCase(fetchFriendsOfUser.rejected, (state, action) => {
        state.isFetchFriendsLoading = false;
        state.fetchFriendsError =
          action.error.message ?? "Error fetching friends ";
      })
      .addCase(searchUsers.pending, (state) => {
        state.isSearchUsersLoading = true;
        state.searchUsersError = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.isSearchUsersLoading = false;
        state.users = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.isSearchUsersLoading = false;
        state.searchUsersError =
          action.error.message ?? "Error fetching habit completions ";
      });
  },
});

export const selectUsers = (state: { users: UsersState }) => state.users.users;

export const selectUserById =
  (searchId: string) => (state: { users: UsersState }) =>
    state.users.users.find(({ id }) => id === searchId);

export const selectFriends = (state: { users: UsersState }) =>
  state.users.friends;

export const usersActions = usersSlice.reducer;
