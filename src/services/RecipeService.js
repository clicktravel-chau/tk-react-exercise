import axios from 'axios';

const getAll = () => {
  return axios.get('/api/recipe/recipes/');
};

const get = id => {
  return axios.get(`/api/recipe/recipes/${id}/`);
};

const create = data => {
  return axios.post('/api/recipe/recipes/', data);
};

const update = (id, data) => {
  return axios.patch(`/api/recipe/recipes/${id}/`, data);
};

const remove = id => {
  return axios.delete(`/api/recipe/recipes/${id}/`);
};

const findByName = name => {
  return axios.get(`/api/recipe/recipes/?name=${name}`);
};

const RecipeService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByName,
};

export default RecipeService;
