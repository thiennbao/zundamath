import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const tokenUtil = {
  get: () => {
    return cookies.get("token");
  },
  sign: (token: string) => {
    cookies.set("token", token);
  },
  remove: () => {
    cookies.remove("token");
  },
  verify: async () => {
    const token = cookies.get("token");
    if (token) {
      try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, { token });
        return res.data.verified;
      } catch (error: any) {
        console.log(error.message);
      }
    }
    return null;
  },
};

export default tokenUtil;
