import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';
import { useForm } from "react-hook-form";
import Login from './Login'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { detectOverflow } from '@popperjs/core';
import toast, { Toaster } from 'react-hot-toast';

function Items({ getdata, currentItems }) {



    const [ghichu, setghichu] = useState('')
    const [title, settitle] = useState('')
    const [updatetitle, setupdatetitle] = useState('')
    const [updatename, setupdatename] = useState('')
    const [name, setname] = useState([])
    const [ids, setid] = useState()
    const [show, setShow] = useState(false);
    const [shows, setShows] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const UpdateClose = () => {
        setShows(false);
        setghichu('')
        setupdatetitle('')
        setupdatename('')
        settinh(null)
        setvaluehuyen(null)
        Setvaluexa(null)
        handleClose()
    }
    const UpdateShow = () => setShows(true);
    const [api, setapi] = useState([])
    const [code, setcode] = useState('')
    const [codehuyen, setcodehuyen] = useState()
    const [huyen, sethuyen] = useState([])
    const [xa, setxa] = useState([])
    const [tinh, settinh] = useState('')
    const [valuehuyen, setvaluehuyen] = useState('')
    const [valuexa, Setvaluexa] = useState('')

    function Putmethod(res, id) {
        UpdateShow()
        setupdatetitle(res.title)
        setid(id)
        settinh(res.Tinh)
        setghichu(res.note)
        setvaluehuyen(res.Huyen)
        Setvaluexa(res.Xa)

    }
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const Deletemethod = async (id) => {


        if (window.confirm('Bạn có chắc chắn muốn muốn xoá dữ liệu này')) {

            await axios.delete(`https://632d221d0d7928c7d2455e19.mockapi.io/todolist/user/` + id)

            await getdata()

            toast.success('deleted data', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        }
    }


    const onUpdate = async () => {

        const fromdata = {
            title: updatetitle,
            name: updatename,
            Tinh: tinh,
            Huyen: valuehuyen,
            Xa: valuexa,
            note: ghichu
        }
        await axios.put(`https://632d221d0d7928c7d2455e19.mockapi.io/todolist/user/` + ids, fromdata)

        getdata()
        setupdatetitle('')
        setupdatename('')
        settinh()
        setvaluehuyen('')
        Setvaluexa('')
        handleClose()
        toast.success('Update successful', {
            style: {
                border: '1px solid #713200',
                padding: '16px',
                color: '#713200',
            },
            iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
            },
        });
        getdata()
        UpdateClose()
        console.log('re-ender')
    }
    useEffect(() => {
        axios.get('https://provinces.open-api.vn/api/')
            .then(res => setapi(res.data))
    }, [])
    useEffect(() => {
        if (!code) {
            return
        }
        axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
            .then(res => sethuyen(res.data.districts))
    }, [code])
    useEffect(() => {
        if (!codehuyen) {
            return
        }
        axios.get(`https://provinces.open-api.vn/api/d/${codehuyen}?depth=2`)
            .then(res => setxa(res.data.wards))
    }, [codehuyen])
    function onchange(e) {
        setcode(e.target.value)
        var index = e.target.selectedIndex
        if (!index) {
            return
        }

        settinh(e.target[index].outerText)

    }

    return (
        <>
            <div style={{ height: '530px' }}>


                <Table striped bordered hover>
                    <thead >

                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>
                                Note</th>
                            <th>Activate</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems &&
                            currentItems.map((res, index) => (

                                <tr key={res.id}>
                                    <td>{index + 1}</td>
                                    <td>{res.title}</td>
                                    <td>{res.Xa} - {res.Huyen} - {res.Tinh}</td>
                                    <td>{res.note}</td>
                                    <td>  <Button onClick={() => Putmethod(res, res.id)} variant="primary" style={{ fontSize: '10px' }}  >
                                        &#160;
                                        Update
                                    </Button>
                                        <Button style={{ backgroundColor: '#30A64A', fontSize: '10px' }} onClick={() => Deletemethod(res.id)}>Delete</Button></td>
                                </tr>



                            ))
                        }
                    </tbody>
                </Table>
                <Modal show={shows} onHide={UpdateShow}>
                    <Modal.Header >
                        <Modal.Title>Update</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit(onUpdate)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    onChange={(e) => setupdatetitle(e.target.value)}
                                    value={updatetitle}
                                    required
                                    type="text"
                                    placeholder="Full name" />
                                <Form.Control.Feedback type="invalid">
                                    FullName không được để trống
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Province / City</Form.Label><br></br>
                                <select className="Input" onChange={onchange}   >

                                    {api.map((res) => (
                                        <option required value={res.code} key={res.code} > {res.name}  </option>
                                    ))}
                                </select ><br></br><br></br>
                                <Form.Label>District</Form.Label><br></br>
                                <select className="Input" required onChange={(e) => {
                                    setcodehuyen(e.target.value)
                                    var index = e.target.selectedIndex;
                                    if (!index) {

                                        return
                                    }

                                    setvaluehuyen(e.target[index].outerText)
                                }
                                }
                                >
                                    {huyen.map((res) => (
                                        <option label={res.name} value={res.code} key={res.code}>{res.name} </option>
                                    ))}
                                </select><br></br> <br></br>
                                <Form.Label>Ward</Form.Label><br></br>
                                <select className="Input" onChange={(e) => Setvaluexa(e.target.value)} >
                                    {xa.map(res => (
                                        <option required label={res.name} value={res.name} key={res.code}>{res.name} </option>
                                    ))}
                                </select><br></br>

                                <Form.Control.Feedback type="invalid">
                                    Address không được để trống
                                </Form.Control.Feedback>
                                <br></br>
                                <Form.Label>Note</Form.Label>
                                <Form.Control
                                    onChange={(e) => setghichu(e.target.value)}
                                    value={ghichu}
                                    type="text"
                                    placeholder="Note" />
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{ backgroundColor: '#30A64A' }}>
                                Update
                            </Button>
                            <Button onClick={UpdateClose} style={{ backgroundColor: '#DA3849', marginLeft: '10px' }} variant="primary" >
                                Huỷ
                            </Button>
                        </Form>


                    </Modal.Body>

                </Modal>
            </div>

        </>
    );
}

export default Items;