import _axios from "axios";

const axiosNoToken = _axios.create({
    baseURL: "https://auctiont2305m20241005002809.azurewebsites.net",
    timeout: 10000,
});
export default axiosNoToken;