import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import * as orderService from '../service/OrderService';
import * as productService from '../service/ProductService';
import * as Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router";
import * as Yup from 'yup';

export function OrderUpdate() {
    const param = useParams(0);
    const [product, setProduct] = useState([]);
    const [order, setOrder] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getOrderApi = async () => {
            const res = await orderService.findOrderById(param.id);
            console.log(res.data)
            setOrder(res.data)
        }
        const productTypeApi = async () => {
            const res = await productService.findAll();
            setProduct(res.data);
        }
        getOrderApi();
        productTypeApi();
    }, [param.id]);
    if (!order){
        return null;
    }
    return (
        <>
            <Formik initialValues={{
                idOrder: order?.idOrder,
                date: order?.date,
                product: +order?.product.idProduct,
                quantity: +order?.quantity,
                totalMoney: +order?.totalMoney,
                deleteStatus: +order?.deleteStatus
            }}
                    validationSchema={Yup.object({
                        productId: Yup.number().moreThan(0, "Bắt buộc chọn"),
                        date: Yup.string().required("Bắt buộc chọn"),
                        quantity: Yup.number().moreThan(0, "Lớn hơn 0").required("Bắt buộc nhập")
                    })}
                    onSubmit={(values) => {
                        const update = async () => {
                            await orderService.updateOrder({
                                ...values,
                                idOrder: +values?.idOder,
                                quantity: +values?.quantity,
                                product: product.find(p => p.idProduct === +values?.product),
                                totalMoney: +values?.quantity * product.find(p => p.idProduct === +values.product)?.price,
                                deleteStatus: false
                            })
                            navigate("/");
                            Swal.fire({
                                icon: "success",
                                title: "Sửa order",
                                html: `Sửa sản phẩm <span style="color: red">${product.find(p => p.idProduct === +values.product)?.name} </span> thành công !!`,
                                timer: 3000,
                            })
                        }
                        update();
                    }}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xxl-4">
                            <div>
                                <div className="my-5 d-flex justify-content-center">
                                    <h1>Sủa order sản phẩm</h1>
                                </div>
                                <Form>
                                    <div className="mt-3">
                                        <label>Sản phẩm</label>
                                        <Field className="form-select" name="product" type="number" as="select">
                                            <option value={0}>--Chọn sản phẩm--</option>
                                            {
                                                product.map(p => (
                                                    <option key={p.idProduct} value={p.idProduct}>{p.name}</option>
                                                ))
                                            }
                                        </Field>
                                        <ErrorMessage component="span" style={{color: 'red'}} name="product"/>
                                    </div>
                                    <div className="mt-3">
                                        <label>Ngày mua</label>
                                        <Field className="form-control" name="date" type="date"/>
                                        <ErrorMessage component="span" style={{color: 'red'}} name="date"/>
                                    </div>
                                    <div className="mt-3">
                                        <label>Số lượng</label>
                                        <Field className="form-select" name="quantity" type="number"/>
                                        <ErrorMessage component="span" style={{color: 'red'}} name="quantity"/>
                                    </div>
                                    <div className="mt-3">
                                        <Field className="form-control" hidden name="totalMoney" type="number"/>
                                    </div>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-center mt-5">
                                            <button type="submit" className="btn btn-success">Sửa</button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Formik>
        </>
    )
}