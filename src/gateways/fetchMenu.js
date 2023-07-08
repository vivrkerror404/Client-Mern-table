import axios from "axios";
import { MenuParser } from "entities/menuParser";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function fetchMenu() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/recipe/list`);
    return data?.success === 1 ? MenuParser(data?.data) : [];
  } catch (e) {
    throw new Error();
  }
}

export { fetchMenu };
