
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Navbar } from 'react-bootstrap';



const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const ID = "424c2cc0";
  const Key = "405a7387a3ae3a1478814048a1cdb4df";

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${Key}`);
    setRecipes(response.data.hits);
  };

  return (
    <div>
        <Navbar bg="dark" variant='dark' expand='lg-2'>
          <Container>
            <Navbar.Brand href = "Home">
                <img src="https://i.ndtvimg.com/i/2015-10/urlai-roast_625x350_71444723419.jpg"
                 width="55" height="55" 
                 className='d-inline-block align-top rounded'   />
                 {'Recipe App'}
            </Navbar.Brand>
            </Container>  

        </Navbar>
    <div className="container mt-lg-2">
        
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for recipes..."
            value={query}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">Search</button>
          </div>
        </div>
      </form>

      <div className="row">
        {recipes.map((recipe, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <img src={recipe.recipe.image} className="card-img-top" alt={recipe.recipe.label} />
              <div className="card-body">
                <h5 className="card-title">{recipe.recipe.label}</h5>
                <p className="card-text">Source: {recipe.recipe.source}</p>
                <a href={recipe.recipe.url} className="btn btn-primary">View Recipe</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default RecipeSearch;

