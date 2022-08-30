import React, {useContext} from 'react'
import NoteContext from "../Context/notes/NoteContext"

const Noteitem = (props) => {
  const context= useContext(NoteContext);
  const {deleteNote}=context;
    const {note, updateNote}= props;
    // const deleted=()=>{
    //   showAlert("item deleted", "success")
    // }
  return (
    <div className="col md-3">
      <div className="card my-3" style={{"width": "18rem"}}>
     <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash-can " onClick={()=>{deleteNote(note._id);props.showAlert("Note deleted successfully", "success")}}></i>
    <i className="fa-solid fa-pencil mx-2" onClick={()=>{updateNote(note)}}></i>
    
  </div>
</div>
    </div>
  )
}

export default Noteitem
