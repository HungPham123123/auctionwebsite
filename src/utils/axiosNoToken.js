import _axios from "axios";

const axiosNoToken = _axios.create({
    baseURL: "https://localhost:7006",
    timeout: 10000,
});
export default axiosNoToken;