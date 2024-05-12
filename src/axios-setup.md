# First Install:

```
npm install axios
```

# Create Service File:

```
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', - base url for API
  timeout: 10000, // Timeout duration in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiService;
```

# Basic use in component

```
  useEffect(() => {
    const handleGetPosts = async () => {
      try {
        const response = await apiService.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    handleGetPosts();
  }, []);

```
