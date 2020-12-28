const NotesMenu = (props) => {
    const {categoryChange,categories} = props;
    const buttons = [];
    for (let prop in categories) {
        buttons.push(<button key={prop} onClick={categoryChange} className={`btn btn-outline-dark me-2 ${categories[prop]}`} >{prop}</button>);
    }
    return (
        <div className="d-flex mb-5">
            {buttons}
        </div>
    );
}

const CreateNote = (props) => {
    return(
        <div className="col-3">
            <form onSubmit={props.handleSubmit} className="frm-create-note d-flex flex-column">
                <textarea onChange={props.handleChange} rows="5" value={props.currentNote}>
                    
                </textarea>
            
                <input type="submit" className="btn btn-outline-dark mt-3" value="Create a Note"/> 
            </form>
           
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
            categories:{
                All:'active',
                Completed:'',
                Incomepleted:''
            }
        }

      

        this.Apikey = 248;
        this.handleChange = this.handleChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return(
            <div>
                <h1 className="text-center"> To Do List </h1>
                <div className="container">
                    <div className="row">
                        <NotesMenu categories={this.state.categories} categoryChange={this.categoryChange} />
                        <CreateNote handleChange={this.handleChange} handleSubmit={this.handleSubmit} currentNote={this.state.currentNote} />
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