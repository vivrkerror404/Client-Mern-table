import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("BASE_URL is == ", BASE_URL, "===", process.env);
async function fetchMenu() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/recipe/list`);
    return data?.success === 1 ? data?.data : [];
  } catch (e) {
    throw new Error();
  }
}

export { fetchMenu };
