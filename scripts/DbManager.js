const baseURL = 'http://localhost:3000/anuncios';



export async function Insert(obj) {
    try {
      const response = await axios.post(baseURL, obj);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  export async function GetAll() {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  export async function Delete(id) {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  export async function GetById(id) {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }