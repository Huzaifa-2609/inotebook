import React, {useContext, useState} from 'react'
import NoteContext from "../Context/notes/NoteContext"

export const AddNote = (props) => {
  const context= useContext(NoteContext);
  const {addNote}=context;
  const [note, setNote] = useState({title:"", description:"", tag:""});
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  const handleClick=(e)=>{
    e.preventDefault();
    setNote({title:"", description:"", tag:""});
    const {title, description, tag}=note;
    addNote(title, description, tag);
    props.showAlert("Notes Added Successfully", "success");
  }
  return (
    <div > 
    <h1>Add note</h1>
    <form >    
    <div className="mb-3 my-3 row">
    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
    <div className="col-sm-10">
    <input type="text"name='title' value={note.title} className="form-control-plaintext" id="title" onChange={onChange}/>
    </div>
  </div>
  <div className="mb-3 row">
    <label htmlFor="description" className="col-sm-2 col-form-label">description</label>
    <div className="col-sm-10">
      <input type="text" name='description' value={note.description} className="form-control" id="description" onChange={onChange}/>
    </div>
  </div>
  <div className="mb-3 row">
    <label htmlFor="tag" className="col-sm-2 col-form-label">tag</label>
    <div className="col-sm-10">
      <input type="text" name='tag' className="form-control" value={note.tag} id="tag" onChange={onChange}/>
    </div>
  </div>
  </form>
  <button type="button" disabled={note.title.length<5||note.description.length<5} className="btn btn-dark my-3" onClick={handleClick}>Add Note</button>
</div>
  )
}
