import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

// Request interceptor for API calls
axios.interceptors.request.use(
  async config => {
    // const value = await redisClient.get(rediskey)

    config.headers = {
      Accept: "application/json;multipart/form-data",
    };
		const token = await localStorage.getItem("user_token");
    if (token) {
      config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json;multipart/form-data',
      }
    }
    
    return config;
  },
  error => {
    Promise.reject(error)
  });

// Response interceptor for API calls
axios.interceptors.response.use((response) => {  
  return response
}, async function (error) {
  // const originalRequest = error.config;

  // // console.log("Error", JSON.stringify(error))

  // if (error && error.response.status === 401) {
  //   // TODO: Looking for a way to centralize error handling 
  //   // (https://www.pluralsight.com/guides/centralized-error-handing-with-react-and-redux) 
  //   return Promise.reject(error)
  // }

  // if (error.response.status === 403 && !originalRequest._retry) {
  //   originalRequest._retry = true;
  //   // const access_token = await refreshAccessToken();            
  //   // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;    
  //   return axios(originalRequest);
  // }
  return Promise.resolve(error.response);
});

export default axios;