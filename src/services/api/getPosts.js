import { BASE_CLIENT_URL } from "../config/baseClient";
import { API_PATH } from "../config/endpoints";

export const getPosts = async () =>
  await fetch(`${BASE_CLIENT_URL}${API_PATH.GET_POSTS}`).then((res) =>
    res.json()
  );

/** Example of options for fetch API - most common for you
{
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    }
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }

*/
