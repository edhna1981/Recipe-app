

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import RecipeList from "../Components/RecipeList";
import RecipeForm from "../Components/RecipeForm";
import Form from "react-bootstrap/Form";

import {fetchRecipes,addRecipe,updateRecipe,deleteRecipe,searchRecipes} from "../Redux/slice/recipeSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const { allRecipes, loading, error } = useSelector(
    (state) => state.recipeReducer);

  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  if (allRecipes.length == 0) {
    dispatch(fetchRecipes());
  }
}, [dispatch, allRecipes.length]);

  function handleSave(recipe) {
    if (editingRecipe) {
      dispatch(updateRecipe(recipe));
      setEditingRecipe(null);
    } else {
      dispatch(addRecipe(recipe));
    }

    setShowForm(false);
    navigate("/");
  }

  function handleEdit(recipe) {
    setEditingRecipe(recipe);
    setShowForm(true);
  }

  function handleDelete(id) {
    dispatch(deleteRecipe(id));
  }

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Recipe App</h1>

      <div className="text-center mb-4">
        <Button onClick={() => navigate("/add")}>
          Add Recipe
        </Button>
      </div>
      <Form.Control type="text" placeholder="Search by cuisine..." 
      value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value);
        dispatch(searchRecipes(e.target.value));
      }}
       className="mb-4"
      />

      {showForm && (
        <RecipeForm
          editingRecipe={editingRecipe}
          onSave={handleSave}
        />
      )}

      {loading && <p>Loading recipes...</p>}
      {error && <p>{error}</p>}

      {!loading && (
        <RecipeList
          recipes={allRecipes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Container>
  );
}

export default Home;


