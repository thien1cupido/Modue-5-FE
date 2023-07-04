import * as productService from '../service/OrderService';
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import * as Swal from "sweetalert2";

export function OrderList() {
    const [product, setProduct] = useState([]);
    const getProductApi = () => {
        const res = productService.findAll();
        res.then(result => {
            setProduct(result.data)
        }).catch(e => {
            console.log(e);
        })
    }
    const deleteOrder = async (id) => {
        await productService.deleteOrder(id);
    }
    const sendInfoDelete = async (id) => {
        Swal.fire({
            icon: "warning",
            title: "Xóa order",
            html: `Bạn có muốn xóa order có mã là <span style='color: red'>${200 + id}</span> không?`,
            showCancelButton: true,
            confirmButtonColor: '#d11212',
            cancelButtonColor: '#5e585c',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then(async (res) => {
            if (res.isConfirmed) {
                await deleteOrder(id);
                await getProductApi();
                await Swal.fire({
                    icon: "success",
                    title: "Xóa order",
                    html: `Đã xóa  thành công<span style='color: red'>${200 + id}</span> !!`,
                    timer: 3000
                })
            }
        })
    }

    useEffect(() => {
        getProductApi();
    }, [])
    return (
        <>
            <div className="container">
                <h1 className="text-center py-5">Thống kê đơn hàng</h1>
                <div className="my-4 ms-5 d-flex  justify-content-xxl-between">
                    <NavLink to="/create">
                        <button className="btn btn-success">Thêm mới</button>
                    </NavLink>
                    <div>
                        <button className="btn btn-primary">Xem top</button>
                    </div>
                    <div>
                        <Formik initialValues={{
                            nameSearch: '',
                            productType: '',
                        }}
                                onSubmit={(values) => {
                                    const searchProduct = async () => {
                                        // const res = await productService.search(values);
                                        // setProduct(res.data);
                                    }
                                    searchProduct();
                                }}
                        >
                            <Form className="d-flex justify-content-center">
                                <Field className="form-control" name="nameSearch" type="date"/>
                                <Field className="form-select ms-3" name="productType" as="select">
                                    <option value={''}>--Chọn loại sản phẩm--</option>
                                    {
                                        // productType.map(pt => (
                                        //     <option key={pt.id} value={pt.id}>{pt.name}</option>
                                        // ))
                                    }
                                </Field>
                                <button type="submit" className="btn btn-info ms-3">
                                    Tìm
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <table className="table table-striped table-hover text-center">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn hàng</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Loại sản phẩm</th>
                        <th>Ngày mua</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền(USD)</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        product.map((o, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{200 + o.idOrder}</td>
                                <td>{o.product.name}</td>
                                <td>{o.product.price}</td>
                                <td>{o.product.productType.name}</td>
                                <td>{o.date}</td>
                                <td>{o.quantity}</td>
                                <td>{o.totalMoney}</td>
                                <td>
                                    <button className="btn btn-warning">Sửa</button>
                                    <button className="btn btn-danger ms-3" onClick={() => {
                                        sendInfoDelete(o.idOrder)
                                    }}>Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}