
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch recipes from API
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const result = await axios.get("https://dummyjson.com/recipes");
    return result.data.recipes;
  }
);

const recipeSlice = createSlice({
  name: "recipes",

  initialState: {
    allRecipes: [],
    allRecipesDummy: [],
    error: "",
    loading: false,
  },

  reducers: {
    
searchRecipes: (state, action) => {
  const searchTerm = action.payload.toLowerCase().trim();

  if (searchTerm == "") {
    state.allRecipes = [...state.allRecipesDummy];
  } else {
    state.allRecipes = state.allRecipesDummy.filter((item) =>
      item.cuisine?.toLowerCase().includes(searchTerm)
    );
  }
},

   
    

   
    addRecipe: (state, action) => {
      state.allRecipes.unshift(action.payload);
      state.allRecipesDummy.unshift(action.payload);
    },

    
    deleteRecipe: (state, action) => {
      state.allRecipesDummy = state.allRecipesDummy.filter(
        (item) => item.id !== action.payload
      );

      state.allRecipes = state.allRecipes.filter(
        (item) => item.id !== action.payload
      );
    },

   
    updateRecipe: (state, action) => {
      const index = state.allRecipesDummy.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.allRecipesDummy[index] = {
          ...state.allRecipesDummy[index],
          ...action.payload,
        };
      }

      const filteredIndex = state.allRecipes.findIndex(
        (item) => item.id === action.payload.id
      );

      if (filteredIndex !== -1) {
        state.allRecipes[filteredIndex] = {
          ...state.allRecipes[filteredIndex],
          ...action.payload,
        };
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.allRecipes = action.payload;
      state.allRecipesDummy = action.payload;
      state.loading = false;
      state.error = "";
    });

    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchRecipes.rejected, (state) => {
      state.loading = false;
      state.error = "API failed";
    });
  },
});

export const {searchRecipes,addRecipe,deleteRecipe,updateRecipe} = recipeSlice.actions;

export default recipeSlice.reducer;

