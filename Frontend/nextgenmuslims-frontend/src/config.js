const API_BASE_URL = "http://nextgen.local";  // Change this if using cloud deployment

const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/auth`,
  library: `${API_BASE_URL}/library`,
  community: `${API_BASE_URL}/community`,
  forum: `${API_BASE_URL}/forum`,
  mentorship: `${API_BASE_URL}/mentorship`,
  payment: `${API_BASE_URL}/payment`,
  programs: `${API_BASE_URL}/programs`,
  training: `${API_BASE_URL}/training`,
};

export default API_ENDPOINTS;

