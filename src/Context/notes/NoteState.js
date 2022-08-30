import NoteContext from "./NoteContext";
import  {useState} from 'react';
const NoteState =(props)=>{
  const host= "http://localhost:9000"
  const initialNotes=[];

  const [notes, setNotes]=useState(initialNotes)
  const [alert, setAlert] = useState(null);

    //Fetch all notes
    const fetchNotes=async ()=>{
    const response = await fetch(`${host}/api/Notes/fetchallnotes`, {
    "method": 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
    });
    const res= await response.json();
    setNotes(res);
  }
    //Add a Note
    const addNote=async (title, description, tag)=>{
    const response = await fetch(`${host}/api/Notes/addNote`, {
    "method": 'POST',
        
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}) 
    });

    const note= await response.json();
    setNotes(notes.concat(note))
    }
      
      //Delete a note

      const deleteNote=async(id)=>{
        const response = await fetch(`${host}/api/Notes/deletenote/${id}`, {
          "method": 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem('token')
          },
        });
        console.log("deleting the node with id "+id);
        const newNote= notes.filter((note)=>{ return note._id!==id});
        setNotes(newNote)
      }
      //edit a note
       const updateNote= async(id, title, description, tag)=>{
        //Calling Api
        const response = await fetch(`${host}/api/Notes/updatenote/${id}`, {
          "method": 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag})  
        });
        let newNote= JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNote.length; index++) {
          const element = newNote[index];
          if(element._id===id){
            newNote[index].title=title;
            newNote[index].description=description;
            newNote[index].tag=tag;
            break;
          }
        }
        // console.log(notes.length);
        setNotes(newNote);
        // console.log(newNote)
      }
  const showAlert = (message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
}
    return(
        <NoteContext.Provider value={{notes, setNotes, alert, showAlert, addNote, updateNote, deleteNote, fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;