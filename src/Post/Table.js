import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import Select from 'react-select';




function Table( Tinh) {

    const [api, setapi] = useState([])
    const [code, setcode] = useState('')
    const [codehuyen, setcodehuyen] = useState()
    const [huyen, sethuyen] = useState([])
    const [xa, setxa] = useState([])
    const [tinh, settinh] = useState()
    const [valuehuyen, setvaluehuyen] = useState( )
    const [valuexa , Setvaluexa] = useState()

console.log(Tinh)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        var from ={
            Tinh : tinh,
            Huyen : valuehuyen,
            Xa : valuexa
        }
        axios.post('https://632d221d0d7928c7d2455e19.mockapi.io/todolist/user' ,from)
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
    if(!index){

        return
    }

    settinh(e.target[index].outerText)

}



    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}> 
            <label>tỉnh</label>
            <select  onChange={onchange}   >
       
                {api.map((res ) => ( 
                    <option   value={res.code}  key={res.code} > {res.name}  </option>
                ))} 
            </select >
            <label>huyện</label>
            <select  onChange={(e) => {setcodehuyen(e.target.value)
             var index = e.target.selectedIndex;
             if(!index){

                return}

                setvaluehuyen(e.target[index].outerText)
            }
        }
            >
                {huyen.map((res) => ( 
                    <option label={res.name} value={res.code} key={res.code}>{res.name} </option>
                ))}
            </select>
            <label>xã</label>
            <select onChange={(e)=> Setvaluexa ( e.target.value)} >
                {xa.map(res => (
                    <option label={res.name} value={res.name} key={res.code}>{res.name} </option>
                ))}
            </select>
          
          
    
    {/* <input type='submit'></input> */}
            </form>
            
        </div>

    )
}
export default Table;