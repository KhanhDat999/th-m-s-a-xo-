import React from "react";
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
import Country from './Table'
import GoogleLogin from 'react-google-login';
import ReactPaginate from 'react-paginate';
import Items from "./Items";




function Profile({ itemsPerPage = 10 }) {

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



  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async (data) => {


    const Deletemethod = async (id) => {


      if (window.confirm('Bạn có chắc chắn muốn muốn xoá dữ liệu này')) {

        await axios.delete(`https://632d221d0d7928c7d2455e19.mockapi.io/todolist/user/` + id)

        await getdata()
        console.log('deletemethod')
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
    var formdata = {
      title: updatetitle,
      name: updatename,
      Tinh: tinh,
      Huyen: valuehuyen,
      Xa: valuexa,
      note: ghichu
    }
    await axios.post('https://632d221d0d7928c7d2455e19.mockapi.io/todolist/user', formdata)
      .then(() => {
        setupdatetitle('')
        setupdatename('')
        settinh(null)
        setvaluehuyen(null)
        Setvaluexa(null)
        handleClose()
        toast.success('successful new creation', {
          id: 'clipboard',
        })
        getdata()

      })
      .catch(() => { toast.error("new creation failed") })

  }

  const getdata = async () => {
    axios.get('https://632d221d0d7928c7d2455e19.mockapi.io/todolist/user')

      .then(res => {
        setname(res.data)
      })
  }
  useEffect(() => {
    getdata()
  }, [])





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

    setupdatetitle('')
    setupdatename('')
    settinh()
    setvaluehuyen('')
    Setvaluexa('')
    handleClose()
    getdata()
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
    UpdateClose()

    console.log('update')


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

  const responseGoogle = (response) => {
    console.log('errror', response);
  }

  // reactpagination
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);


  const endOffset = itemOffset + itemsPerPage;
  const currentItems = name.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(name.length / itemsPerPage)


  console.log(currentItems)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % name.length;
    setItemOffset(newOffset);
  };

  // reactpagination

  return (
    <div>
      <Toaster
        reverseOrder={true} />
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features"></Nav.Link>
            <Nav.Link href="#Login"><Login /> </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div>



        <Items getdata={getdata} currentItems={currentItems} />
        <div style={{ position: 'relative' }}>

          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
        {/* </tbody>
        </Table> */}
      </div>


      <Button style={{ backgroundColor: '#30A64A', fontSize: '10px' }} onClick={handleShow} >
        &#160;
        Add new
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
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

            <Button type='submit' variant="primary" style={{ backgroundColor: '#30A64A' }} value='Thêm mới' >
              Thêm mới</Button>
            <Button style={{ backgroundColor: '#DA3849', marginLeft: '10px' }} variant="primary" onClick={handleClose} >Huỷ</Button>
          </Form>



        </Modal.Body>

      </Modal>



      <div>

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
            {/* <input onChange={(e) => settitle(e.target.value)} id='title' value={title} placeholder='Name' />
            <input onChange={(e) => setnames(e.target.value)} id='name' value={names} placeholder='Address' /> */}

          </Modal.Body>

        </Modal>

      </div>

    </div>


  );

}


export default Profile;

