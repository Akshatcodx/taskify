import axios from "axios";
import { callApiProps } from "../Interfaces/interfaces";
export const METHODS = {
  get: "GET",
  post: "POST",
  put: "PUT",
  patch: "PATCH",
  delete: "DELETE",
};
const url = "http://localhost:8001/tasks";

export const callApi = async ({
  //   url,
  method,
  params,
  payload,
  dynamicId,
}: callApiProps) => {
  try {
    const fullUrl = dynamicId ? `${url}/${dynamicId}` : url;

    switch (method) {
      case METHODS.get: {
        const config = params ? { params: { ...params } } : {};
        return await axios.get(fullUrl, config);
      }

      case METHODS.post: {
        return await axios.post(fullUrl, { ...payload });
      }

      case METHODS.put: {
        return await axios.put(fullUrl, { ...payload });
      }

      case METHODS.patch: {
        return await axios.patch(fullUrl, { ...payload });
      }

      case METHODS.delete: {
        return await axios.delete(fullUrl);
      }

      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  } catch (error) {
    console.error(`API call failed: ${error}`);
    throw error;
  }
};
