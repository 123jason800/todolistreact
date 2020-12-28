const NotesMenu = (props) => {
   
    return (
        <div class="d-flex mb-5">
            <button className="btn btn-outline-dark me-2">All</button>
            <button className="btn btn-outline-dark me-2">Completed </button>
            <button className="btn btn-outline-dark me-2">Incomepleted</button>
        </div>
    );
}

const CreateNote = (props) => {
    return(
        <div className="col-3">
            <button className="btn btn-primary"> Create A Note</button>
        </div>
    );
}

const ShowNotes = (props) => {
    return (
        <div className="div-col-3">
            <div className="post-sticks">
                
            
            </div>
        </div>
    );
}

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentNote:'',
            notes:[],
            category:'all'
        }
        this.Apikey = 248;
    }

    render() {
        return(
            <div>
                <h1 className="text-center"> To Do List </h1>
                <div className="container">
                    <div className="row">
                        <NotesMenu category={this.state.category}/>
                        <CreateNote />
                        <ShowNotes />
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