
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

import RecipeForm from "../Components/RecipeForm";
import { addRecipe } from "../Redux/slice/recipeSlice";

function AddRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSave(recipe) {
    dispatch(addRecipe(recipe));
    navigate("/");
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Add New Recipe</h1>
      <RecipeForm onSave={handleSave} />
    </Container>
  );
}

export default AddRecipe;

