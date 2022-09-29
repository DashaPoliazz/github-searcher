import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_SAVEDREPOSITORIES_KEY = "LS_SAVEDREPOSITORIES_KEY";

interface IState {
  savedRepositories: string[];
}

const initialState: IState = {
  savedRepositories: JSON.parse(
    localStorage.getItem(LS_SAVEDREPOSITORIES_KEY) ?? "[]"
  ),
};

const saveToLocalStorage = (itemsToSave: any) => {
  localStorage.setItem(LS_SAVEDREPOSITORIES_KEY, JSON.stringify(itemsToSave));
};

export const gitHubSlice = createSlice({
  name: "GithubSlice",
  initialState,
  reducers: {
    addToFavourites(state, action: PayloadAction<string>) {
      state.savedRepositories.push(action.payload);

      saveToLocalStorage(state.savedRepositories);
    },
    removeFromFavourites(state, action: PayloadAction<string>) {
      state.savedRepositories = state.savedRepositories.filter(
        (savedRepo) => savedRepo !== action.payload
      );

      saveToLocalStorage(state.savedRepositories);
    },
  },
});

export const githubActions = gitHubSlice.actions;
export const githubReducer = gitHubSlice.reducer;
