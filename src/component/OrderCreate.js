import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import * as orderService from '../service/OrderService';
import * as productService from '../service/ProductService';
import * as Swal from "sweetalert2";
import {useNavigate} from "react-router";
import * as Yup from 'yup';

export function OrderCreate() {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const productTypeApi = async () => {
            const res = await productService.findAll();
            setProduct(res.data);
        }
        productTypeApi();
    }, [])
    return (
        <>
            <Formik initialValues={{
                date: '',
                quantity: '',
                totalMoney: ''
            }}
                    validationSchema={Yup.object({
                        productId: Yup.number().moreThan(0, "Bắt buộc chọn"),
                        date: Yup.string().required("Bắt buộc chọn"),
                        quantity: Yup.number().moreThan(0, "Lớn hơn 0").required("Bắt buộc nhập")
                    })}
                    onSubmit={(values) => {
                        const create = async () => {
                            await orderService.save({
                                ...values,
                                quantity: +values?.quantity,
                                totalMoney: +values?.quantity * product.find(p => p.idProduct === +values.productId)?.price
                            })
                            navigate("/");
                            Swal.fire({
                                icon: "success",
                                title: "Thêm mới",
                                html: `Thêm mới sản phẩm <span style="color: red">${product.find(p => p.idProduct === +values.productId)?.name} </span> thành công !!`,
                                timer: 3000,
                            })
                        }
                        create();
                    }}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xxl-4">
                            <div>
                                <div className="my-5 d-flex justify-content-center">
                                    <h1>Order sản phẩm</h1>
                                </div>
                                <Form>
                                    <div className="mt-3">
                                        <label>Sản phẩm</label>
                                        <Field className="form-select" name="productId" as="select">
                                            <option value={0}>--Chọn sản phẩm--</option>
                                            {
                                                product.map(p => (
                                                    <option key={p.idProduct} value={p.idProduct}>{p.name}</option>
                                                ))
                                            }
                                        </Field>
                                        <ErrorMessage component="span" style={{color: 'red'}} name="productId"/>
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
                                            <button type="submit" className="btn btn-success">Thêm mới</button>
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