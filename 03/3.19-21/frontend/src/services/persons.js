import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (person) => {
    const request = axios.post(baseUrl, person)
    return request.then(response => response.data)
}

const update = (person, id) => {
    const request = axios.put(`${baseUrl}/${id}`, person)
    return request.then(response => response)
}

const remove = (person) => {
  const request = axios.delete(`${baseUrl}/${person.id}`);
  return request.then((response) => response);
};

export default { getAll, create, remove, update }