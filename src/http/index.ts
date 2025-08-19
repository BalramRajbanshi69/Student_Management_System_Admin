// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

// // Unauthenticated API instance
// const API = axios.create({
//   baseURL: API_BASE_URL + "/api",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   }
// });

// // Authenticated API instance
// const APIAuthenticated = axios.create({
//   baseURL: API_BASE_URL + "/api",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
    
//   }
// });

// // Add Bearer token dynamically using request interceptor
// APIAuthenticated.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export { API, APIAuthenticated };





// // import axios from "axios";

// // // Define the base URL using an environment variable
// // const API_BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

// // // Unauthenticated API instance
// // const API = axios.create({
// //   baseURL: API_BASE_URL + "/api",
// //   headers: {
// //     "Content-Type": "application/json",
// //     "Accept": "application/json"
// //   }
// // });

// // // Authenticated API instance
// // const APIAuthenticated = axios.create({
// //   baseURL: API_BASE_URL + "/api",
// //   headers: {
// //     "Content-Type": "application/json",
// //     "Accept": "application/json"
// //   }
// // });

// // // Add Bearer token dynamically using a request interceptor
// // APIAuthenticated.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       config.headers["Authorization"] = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // // Add a response interceptor to handle expired tokens
// // APIAuthenticated.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     // Check for a 401 Unauthorized status and a "jwt expired" message
// //     if (error.response?.status === 401 && error.response?.data?.message === "jwt expired") {
// //       console.log("JWT expired. Logging out user.");
// //       // Clear the token from localStorage
// //       localStorage.removeItem("token");
// //       // Redirect the user to the sign-in page
// //       window.location.href = "/signin";
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // export { API, APIAuthenticated };








import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000";

// Unauthenticated API instance
const API = axios.create({
  baseURL: API_BASE_URL + "/api",
  headers: {
    Accept: "application/json",
  },
});

// Authenticated API instance
const APIAuthenticated = axios.create({
  baseURL: API_BASE_URL + "/api",
  headers: {
    Accept: "application/json",
  },
});

// Add Bearer token dynamically using request interceptor
APIAuthenticated.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Let Axios handle Content-Type for FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle expired tokens
APIAuthenticated.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && error.response?.data?.message === "jwt expired") {
      console.log("JWT expired. Logging out user.");
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export { API, APIAuthenticated };