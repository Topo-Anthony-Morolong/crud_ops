import react from 'react'
import "../App.css"
import { MdClose } from "react-icons/md";

const ReUsedForm = ({handleSubmit, handleOnChange,handleClose, rest})=>{
    return(
        <div className="addContainer">

        <form onSubmit={handleSubmit} method='post'>
                                        
               <div className="close-btn" onClick={handleClose}><MdClose />  </div>

           <lable htmlFor="title">Title :</lable>
           <input type="text" name="title" id="title" onChange={handleOnChange} value={rest.title}/>

           <lable htmlFor="author">Author :</lable>
           <input type="text" name="author" id="author" onChange={handleOnChange} value={rest.author}/>

           <lable htmlFor="publisher">Publisher :</lable>
           <input type="text" name="publisher" id="publisher" onChange={handleOnChange} value={rest.publisher}/>

           <button className="btn">Submit</button>
        </form>

       </div>
    )
}   
    
    export default ReUsedForm
