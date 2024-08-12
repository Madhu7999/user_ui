import logo from './logo.svg';
import './App.css';
import { MdClose } from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from "axios"
import FormTable from './component/FormTable';

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  const [addSection, setAddSection] = useState(false)
  const [editSection,setEditSection] =useState(false)
  const [formData,setFormData] = useState({
    name :"",
    email :"",
    mobile :"",
  })
  const [formDataEdit,setFormDataEdit] = useState({
    name :"",
    email :"",
    mobile :"",
    _id:""
  })
  const [dataList,setDatalist] = useState([])

  
    const handleOnChange =(e)=>{
      const {value,name} =e.target
      setFormData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
      })
    }
    
  

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data)
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        name:"",
        email:"",
        mobile:"",
      })
    }
  }     
  

  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
     if(data.data.success){
        setDatalist(data.data.data)
  }
}
useEffect(()=>{
  getFetchData()
},[]);

const handleDelete =async(id)=>{
  const data = await axios.delete("/delete/"+id)
     if(data.data.message){
      getFetchData()
      alert(data.data.message)
     }
  }
  const handleUpdate =async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update",formDataEdit)
    if(data.data.message){
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
     }

  }
  const handleEditOnchange =async(e)=>{
    const {value,name} =e.target
      setFormDataEdit((preve)=>{
        return{
          ...preve,
          [name] : value
        }
      })
  }
const handleEdit = (el)=>{
  setFormDataEdit(el)
  setEditSection(true)
}


   return(
  <>
  <div className="Container">
    <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>
    {
      addSection && (
        <FormTable
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        handleclose={()=>setAddSection(false)}
        rest={formData}
        />
      )
    }
    {
      editSection && (
        <FormTable
        handleSubmit={handleUpdate}
        handleOnChange={handleEditOnchange}
        handleclose={()=>setEditSection(false)}
        rest={formDataEdit}
        />
      )
    }
    
      

 <div claassName='tableContainer'>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>
          

        </th>
      </tr>
    </thead>
    <tbody>
      { dataList[0] ? (
      
              dataList.map((el)=>{
          return(
            <tr>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.mobile}</td>
              <td>
              <button className='btn btn-edit'onClick={()=>{
                setEditSection(true)
                setFormDataEdit(el)
              }}>Edit</button>
              <button className='btn btn-delete'on onClick={()=>handleDelete(el._id)}>Delete</button>
              </td>
            </tr>

          )

        }))
        
        : (
          <p style={{TextAlign : "center"}}> No data</p>
        )
      }
   </tbody>
  </table>
 </div>

 </div>
 </>
   );
  }
  

  


export default App;
