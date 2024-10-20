import _axios from "axios";

const axiosNoToken = _axios.create({
    // baseURL: "https://auctiont2305m20241011163331.azurewebsites.net",
baseURL: "https://localhost:7006",
    timeout: 10000,
});
export default axiosNoToken;