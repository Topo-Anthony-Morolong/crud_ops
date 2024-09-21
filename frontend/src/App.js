import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import axios from "axios";
import ReUsedForm from './components/ReUsedFrom';

  axios.defaults.baseURL = "http://localhost:8000/api/Book"

function App() {

  const [addSection, setAddSection] =useState(false)
  const [editSection,setEditSection] = useState(false)
  const [formData, setFormData]= useState({
    
    title: "",
    author: "",
    publisher: ""
  })

  const [editFormData, setEditForm]= useState({
    
    title: "",
    author: "",
    publisher: "",
    _id: ""
  })
  const[dataList,setDataList] = useState([])

  const handleOnChange= (e)=>{
     const{value,name}= e.target
     setFormData((preve)=>{
        return{
          ...preve,
          [name]: value
        }
     })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const data = await axios.post("/create",formData);
      console.log(data);
      setAddSection(false)
      alert({})
      fetchAllBooks()

    } catch (error) {
      console.error('error sending data')
      alert({message: "Failed to added book"})
    }
  
  }

  const fetchAllBooks = async()=> {
   try {
    const data = await axios.get("/allBooks");
      setDataList(data.data)
   } catch (error) {
    console.error('failing to load books')
   } 
  
  }
  useEffect(()=>{
    fetchAllBooks()
  },[])

  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id);
    
     if (data.status === 201){  
      fetchAllBooks()
        alert({})
        /**Forcing the browser to reload */
        window.location.reload()
        
    }
  }

  const handleUpdate = async(e) =>{
    e.preventDefault()
    const data = await axios.put("/update/"+editFormData._id);
    console.log(data)
    fetchAllBooks()
  }

  const handleEditOnChange = async (e)=>{
    const{value,name}= e.target
    setEditForm((preve)=>{
       return{
         ...preve,
         [name]: value
       }
    })

  }

  const handleEdit = async(el)=>{

    setEditForm(el)
    setEditSection(true)
    
  }
  return (
    
<>
    <div className="container">
      <button className="btn btn-add" onClick={()=>setAddSection(true)}> Add</button>

      {
        addSection &&(
         
          <ReUsedForm
          handleSubmit ={handleSubmit}
           handleOnChange ={handleOnChange}
           handleClose ={()=>setAddSection(false)}
           rest ={formData}
          />
        )
      }
      { editSection &&(
         
         <ReUsedForm
         handleSubmit ={handleUpdate}
          handleOnChange ={handleEditOnChange}
          handleClose ={()=>setEditSection(false)}
          rest ={editFormData}
          />
      )

      }


      <div className='tableContainer'>
   <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            { dataList[0] ? (
                dataList.map((el)=>{
                  console.log(el)
                  return(
                    <tr>
                      <td>{el.title}</td>
                      <td>{el.author}</td>
                      <td>{el.publisher}</td>
                      <td>
                        <button className='btn btn-edit' onClick={()=>{ handleEdit(el)}}>Edit</button>


                        <button className='btn btn-delete' 
                          onClick={()=>handleDelete(el._id)}>delete</button>
                      </td>
                    </tr>
                  )
                }))
                :(
                  <p>No Books Available</p>
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
