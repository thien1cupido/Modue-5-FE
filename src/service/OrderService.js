import axios from "axios";

export async function updateOrder(param) {
    
}


export const deleteOrder = async (id) => {
    try {
        await axios.delete("http://localhost:8080/api/admin/order/delete-order/" + id)
    } catch (e) {
        console.log(e)
    }
}

export const save = async (values) => {
    try {
        await axios.post("http://localhost:8080/api/admin/order/create-order", values);
    } catch (e) {
        console.log(e);
    }
}

export const findAll = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/admin/order/list")
        return res;
    } catch (e) {
        console.log(e)
    }
}
export const findOrderById = async (id) => {
    try {
        const res = await axios.get("http://localhost:8080/api/admin/order/find-order?id="+id)
        return res;
    } catch (e) {
        console.log(e)
    }
}
