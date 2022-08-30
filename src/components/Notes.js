import React, {useContext, useEffect, useRef, useState} from 'react'
import NoteContext from "../Context/notes/NoteContext"
import Noteitem from './Noteitem';
import { AddNote } from './AddNote'
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    let navigate=useNavigate();
    const context= useContext(NoteContext)
    const {notes, fetchNotes, updateNote}= context;
    let token= localStorage.getItem('token');
    
    useEffect(() => {
      if (!token) {
        navigate('/login');
      }
      else{
        fetchNotes() 
      }
      // eslint-disable-next-line
     }, []);

     const ref = useRef(null);
     const refClose = useRef(null);
     const [note, setNote] = useState({id:"",etitle:"", edescription:"", etag:""});

  const editNote=(currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag}); 
    }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  
  const handleClick=()=>{
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Notes updated successfully", "success")
  }
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
   
<button type="button" style={{display:"none"}} ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  hello
</button>


<div  className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit a note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form >    
    <div className="mb-3 my-3 row">
    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
    <div className="col-sm-10">
    <input type="text" name='etitle' value={note.etitle} className="form-control-plaintext" id="title" onChange={onChange} minLength={5} required/>
    </div>
  </div>
  <div className="mb-3 row">
    <label htmlFor="description" className="col-sm-2 col-form-label">description</label>
    <div className="col-sm-10">
      <input type="text" name='edescription'value={note.edescription}  className="form-control" id="description" onChange={onChange}  minLength={5} required/>
    </div>
  </div>
  <div className="mb-3 row">
    <label htmlFor="tag" className="col-sm-2 col-form-label">tag</label>
    <div className="col-sm-10">
      <input type="text" name='etag' value={note.etag}  className="form-control" id="tag" onChange={onChange} minLength={5} required/>
    </div>
  </div>
  </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
      <h1>Your Notes</h1>
      <div className="container">
       {notes.length===0 && "no notes to preview"}
       </div>
      {notes.map((note)=>{
        return  <Noteitem key={note._id} updateNote={editNote} showAlert={props.showAlert} note={note}/>
      })}
    
    </div>
    </>
  )
}

export default Notes
