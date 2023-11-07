import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../interface";
import { createUser, deleteUser, getAllUsers, updateUser } from "../services";
import { RootState } from "../store";

interface IUserState {
  author: IAuthor[];
  status: "idle" | "loading" | "complated" | "failed";
  error: string | null;
  authorId: string;
}

const initialState: IUserState = {
  author: [],
  status: "idle",
  error: null,
  authorId: "",
};

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
  const response = await getAllUsers();
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "/users/addNewUser",
  async (initialAuthor: IAuthor) => {
    const response = await createUser(initialAuthor);
    return response.data;
  }
);

export const updateApiUser = createAsyncThunk(
  "/users/updateApiUser",
  async (initialAuthor: IAuthor) => {
    const response = await updateUser(initialAuthor, initialAuthor._id);
    return response.data;
  }
);

export const deleteApiUser = createAsyncThunk(
  "/users/deleteApiUser",
  async (initialUserId: string) => {
    await deleteUser(initialUserId);
    return initialUserId;
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
        state.status = "complated";
        state.author = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "an error accourred";
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.status = "complated";
        state.author.push(action.payload);
      })
      .addCase(updateApiUser.fulfilled, (state, action) => {
        state.status = "complated";
        const { id } = action.payload;
        const index = state.author.findIndex((blog) => blog._id === id);
        state.author[index] = action.payload;
      })
      .addCase(deleteApiUser.fulfilled, (state, action) => {
        state.status = "complated";
        state.author = state.author.filter(
          (blog) => blog._id !== action.payload
        );
      });
  },
});

export const displayAllUsers = (state: RootState) => state.users.author;

export const displayUserById = (state: RootState, userId: string) =>
  state.users.author.find((author) => author._id === userId);

export const { setAuthorId } = userSlice.actions;
export default userSlice.reducer;
