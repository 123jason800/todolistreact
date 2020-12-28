const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    throw new Error('Request was either 404 or 500');
}

const json = response => response.json();


const NotesMenu = (props) => {
    const {categoryChange,categories} = props;
    const buttons = [];
    for (let prop in categories) {
        buttons.push(<button 
                    key={prop} 
                    onClick={categoryChange} 
                    className={`btn btn-outline-dark me-2 ${categories[prop]}`}>
                    {prop}
                    </button>);
    }
    return (
        <div className="d-flex mb-5">
            {buttons}
        </div>
    );
}

const CreateNote = (props) => {
    return(
        <div className="col-12 col-md-4 col-lg-3 mb-4">
            <form onSubmit={props.handleSubmit} className="frm-create-note d-flex flex-column">
                <textarea onChange={props.handleChange} rows="5" value={props.currentNote}>
                    
                </textarea>
            
                <input type="submit" className="btn btn-outline-dark mt-3" value="Create a Note"/> 
            </form>
           
        </div>
    );
}

const ShowNotes = (props) => {
    let {notes,deleteNote,category,markNote} = props;
    
    switch(category) {
        case 'Completed':
            notes = notes.filter(note => (note.completed));
            break;
        case 'Incomepleted':
            notes = notes.filter(note => !note.completed);
            break;
    }

    notes = notes.map(note => {
        const {content,completed,id} = note;
        return (
            <div key={id} className="col-12 col-md-4 col-lg-3 mb-4">
                <div className="note">
                    <p className={completed?'text-decoration-line-through':''} >{content}</p>
                    <div className="btn-group mt-3">
                        <button onClick={e => deleteNote(id)} className="btn btn-outline-dark">Delete</button>
                        <button  onClick={e => markNote(id,completed)} className="btn btn-outline-dark"><i className={`fas ${completed?'fa-times red':'fa-check green'}`}></i></button>
                    </div>
                </div>
            </div>
        );
    });



    return (
        <React.Fragment>
          {notes}
        </React.Fragment>
    );
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNote:'',
            notes:[],
            categories:{
                All:'active',
                Completed:'',
                Incomepleted:''
            }
        }

        this.Apikey = 248;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.getCurrentActive = this.getCurrentActive.bind(this);
        this.markNote = this.markNote.bind(this);
    }

    handleError(error) {
        console.log(error);
    }
    
    getCurrentActive(object) {
        for (let prop in object) {
            if (object[prop] === 'active') {
              
                return prop;
            }
        }
        return null;
    }

    categoryChange(event) {
       const category = event.target.textContent;
       let categories = {...this.state.categories};
       categories[this.getCurrentActive(categories)] = '';
       categories[category] = 'active';
       this.setState({categories});
    }

    handleChange(e) {
        const {value} = e.target;
        this.setState({
            currentNote: value
        });

    }

    markNote(id,completed) {
        fetch(`https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_${completed?'active':'complete'}?api_key=248`,{
            method: "PUT",
            mode: "cors",
        })
        .then(checkStatus)
            .then(json)
                .then(data => this.getNotes())
                        .catch(this.handleError);
    }

    getNotes() {
        fetch('https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=248')
        .then(checkStatus)
            .then(json)
                .then(data => this.setState({notes:data.tasks}))
                        .catch(this.handleError);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {currentNote} = this.state;
    if (!currentNote) {
        return;
    }

    

  

    fetch('https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=248',{
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: {
                content: currentNote
            }
        })
    }).then(checkStatus)
            .then(json)
                .then(data => {
                    this.getNotes();
                    this.setState({currentNote:''});
                })
                    .catch(this.handleError);
       
    }

    deleteNote(id) {
        fetch(`https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=248`,{
            method:'DELETE',
            mode:'cors',
        })
            .then(checkStatus)
                .then(json)
                    .then(data => {
                       this.getNotes();
                    })
                        .catch(this.handleError);
   
    }

    componentDidMount() {
        this.getNotes();
    }
    
    render() {
        return(
            <div>
                <h1 className="text-center">To Do List</h1>
                <div className="container">
                    <div className="row">
                        <NotesMenu 
                        categories={this.state.categories}
                        categoryChange={this.categoryChange}
                          />
                        <CreateNote 
                        handleChange={this.handleChange} 
                        handleSubmit={this.handleSubmit} 
                        currentNote={this.state.currentNote} 
                        />
                        <ShowNotes 
                        notes={this.state.notes} 
                        deleteNote={this.deleteNote} 
                        category={this.getCurrentActive(this.state.categories)} 
                        markNote={this.markNote} 
                        />
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <ToDoList />,
    document.getElementById('root')
);