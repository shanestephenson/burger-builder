import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-aa875-default-rtdb.firebaseio.com/'
});

export default instance;