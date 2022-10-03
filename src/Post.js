import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormSelect,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { detectOverflow } from '@popperjs/core';
import ReactPaginate from "react-paginate";
import Select from "react-select";
// import Resource from "~/utils/resource";
const options = [
  { value: "2011-2012", label: "2011-2012" },
  { value: "2012-2013", label: "2012-2013" },
  { value: "2013-2014", label: "2013-2014" },
];
const options1 = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
];




const Cauhinhtiethoc = ({ itemsPerPage = 12 }) => {



  const [listCauhinhKhoi, setListCauhinhKhoi] = useState([]);
  
  
  // const [currentItems, setCurrentItems] = useState(null);
  // const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
 
  
  
  
  
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => setListCauhinhKhoi(json))
    
    .catch(  console.warn('có lỗi'))
  }, []);
  
const pageCount = Math.ceil(listCauhinhKhoi.length / itemsPerPage)
var endOffset = itemOffset + itemsPerPage;
const currentItems = listCauhinhKhoi.slice(itemOffset , endOffset )
     

console.log('re-ender')
    
    const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listCauhinhKhoi.length;
    setItemOffset(newOffset);
  };
  
  
  
  return (
   <div>
  
      <div className="w-90 mx-auto  border border-secondary fs-6 rounded-1  ">
        <div className="pt-3 pe-3 ps-3 bg-light border-bottom mb-2 pb-3 ">
          <Row>
            <Col>
              <div>
               
                  {/* <i className="fa-regular fa-list-dropdown me-2 h3"></i> */}
               
               
                  Danh sách khối{" "}
               
              </div>
            </Col>
          </Row>
        </div>
  
        <div className=" p-2 text-center ">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã khối </th>
                <th>Tên khối</th>
                <th>Mã cấp học</th>
                <th>Cấp học</th>
              </tr>
            </thead>
            <tbody>
          
              <Items 
               currentItems={currentItems} />
                    <Items 
               />
            </tbody>
          </Table>
  
          <div>
            <Row>
              <Col>
                <div>
                  <ReactPaginate
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={10}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="p-3 border-top bg-light">
          <Row>
            <Col>
              <Row>
                <Col className="">
                  <p className="pt-2 float-end">Hiển thị :</p>
                </Col>
                <Col xs={3}>
                  <Select
                    className="w-75"
                    options={options1}
                    placeholder="Hiển thị"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      
      </div>
  )
};
  


  

function Items({ currentItems }) {
  return (
    <>
  
      {currentItems &&
        currentItems.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.id}</td>
            <td>{item.MA_CAP_HOC}</td>
            <td>{item.TEN_CAP_HOC}</td>
            
          </tr>
        ))}
    </>
  );
}
export default Cauhinhtiethoc;