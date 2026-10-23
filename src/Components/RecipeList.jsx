
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function RecipeList({ recipes=[], onEdit, onDelete }) {
  if (recipes.length == 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <Row>
      {recipes.map((recipe) => (
        <Col md={4} sm={6} xs={12} key={recipe.id} className="mb-4">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={recipe.image}
              alt={recipe.name}
              style={{ height: "200px", objectFit: "cover" }}
            />

            <Card.Body>
              <Card.Title>{recipe.name}</Card.Title>

              <Card.Text>
                <strong>Cuisine:</strong> {recipe.cuisine}
              </Card.Text>

              <Button
                variant="primary"
                className="me-2"
                onClick={() => onEdit(recipe)}
              >
                Edit
              </Button>

              <Button
                variant="danger"
                onClick={() => onDelete(recipe.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default RecipeList;
