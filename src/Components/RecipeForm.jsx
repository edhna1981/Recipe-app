
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RecipeForm({ onSave, editingRecipe, onCancel }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [cuisine, setCuisine] = useState("");

 
  useEffect(() => {
    if (editingRecipe) {
      setName(editingRecipe.name);
      setImage(editingRecipe.image);
      setCuisine(editingRecipe.cuisine);
    } else {
      setName("");
      setImage("");
      setCuisine("");
    }
  }, [editingRecipe]);

  const handleSubmit = (e) => { e.preventDefault();

    const recipe = {
      id: editingRecipe ? editingRecipe.id : Date.now(),
      name,
      image,
      cuisine,
    };

    onSave(recipe);

    setName("");
    setImage("");
    setCuisine("");
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <h4>{editingRecipe ? "Edit Recipe" : "Add Recipe"}</h4>

      <Form.Group className="mb-3">
        <Form.Label>Recipe Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter recipe name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image URL"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cuisine</Form.Label>
        <Form.Control
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Enter cuisine"
          required
        />
      </Form.Group>

      <Button type="submit" variant="success">
        {editingRecipe ? "Update Recipe" : "Add Recipe"}
      </Button>

      {editingRecipe && (
        <Button
          type="button"
          variant="secondary"
          className="ms-2"
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
    </Form>
  );
}

export default RecipeForm;

