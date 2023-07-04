import axios from "axios";




export const findAll = async () => {
    try {
        return await axios.get("http://localhost:8080/api/admin/product/list")
    } catch (e) {
        console.log(e)
    }
}