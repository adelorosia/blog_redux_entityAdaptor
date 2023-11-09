import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { IAuthor } from "../interface";
import { createUser, deleteUser, getAllUsers, updateUser } from "../services";
import { RootState } from "../store";

interface IUserSlice {
  status: "idle" | "loading" | "completed" | "failed";
  error: string | null;
  authorId: string;
}

const userAdapter = createEntityAdapter<IAuthor>({
  selectId: (author) => author._id,
});

const initialState: IUserSlice & EntityState<IAuthor> =
  userAdapter.getInitialState({
    status: "idle",
    error: null,
    authorId: "",
  });

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
  const response = await getAllUsers();
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "/users/addNewUser",
  async (initialUser: IAuthor) => {
    const response = await createUser(initialUser);
    return response.data;
  }
);

export const updateApiUser = createAsyncThunk(
  "/users/updateApiUser",
  async (initialUser: IAuthor) => {
    const response = await updateUser(initialUser, initialUser._id);
    return response.data;
  }
);

export const deleteApiUser = createAsyncThunk(
  "/users/deleteApiUser",
  async (initialId: string) => {
    await deleteUser(initialId);
    return initialId;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAuthorId: (state, action) => {
      state.authorId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "completed";
        userAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        (state.status = "failed"),
          (state.error = action.error.message || "An Error Accourred");
      })
      .addCase(addNewUser.fulfilled, userAdapter.addOne)
      .addCase(updateApiUser.fulfilled, userAdapter.updateOne)
      .addCase(deleteApiUser.fulfilled, userAdapter.removeOne);
  },
});

export const { selectAll: displayAllUsers, selectById: displayUserById } =
  userAdapter.getSelectors((state: RootState) => state.users);

export const { setAuthorId } = userSlice.actions;

export default userSlice.reducer;
