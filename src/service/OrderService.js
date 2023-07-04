import axios from "axios";


export const deleteOrder = async (id) => {
    try {
        await axios.delete("http://localhost:8080/api/admin/order/delete-order/" + id)
    } catch (e) {
        console.log(e)
    }
}

//
// export const findTop = () => {
//     try {
//         return axios.get("http://localhost:8080/productList?_sort=price&_sort=quantity&_order=desc");
//     } catch (e) {
//         console.log(e);
//     }
// }
//
//
export const save = async (values) => {
    console.log(values)
    // try {
    //     await axios.post("http://localhost:8080/api/admin/order/create-order", values);
    // } catch (e) {
    //     console.log(e);
    // }
}

export const findAll = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/admin/order/list")
        return res;
    } catch (e) {
        console.log(e)
    }
}
// export const findAllProductType = () => {
//     return axios.get("http://localhost:8080/api/admin/order")
// }
// export const search = (value) => {
//     try {
//         return axios.get(`http://localhost:8080/api/admin/order?date=${value.nameSearch}&productTypeId=${value.productType}`)
//     } catch (e) {
//         console.log(e);
//     }
// }