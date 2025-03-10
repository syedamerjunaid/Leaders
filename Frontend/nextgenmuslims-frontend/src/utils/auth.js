export const isAuthenticated = () => {
    const token = localStorage.getItem("token");  // Check if user has a token
    return token ? true : false;
  };
  