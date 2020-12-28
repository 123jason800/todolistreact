var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var checkStatus = function checkStatus(response) {
    if (response.ok) {
        return response;
    }
    throw new Error('Request was either 404 or 500');
};

var json = function json(response) {
    return response.json();
};

var NotesMenu = function NotesMenu(props) {
    var categoryChange = props.categoryChange,
        categories = props.categories;

    var buttons = [];
    for (var prop in categories) {
        buttons.push(React.createElement(
            "button",
            {
                key: prop,
                onClick: categoryChange,
                className: "btn btn-outline-dark me-2 " + categories[prop] },
            prop
        ));
    }
    return React.createElement(
        "div",
        { className: "d-flex mb-5" },
        buttons
    );
};

var CreateNote = function CreateNote(props) {
    return React.createElement(
        "div",
        { className: "col-12 col-md-4 col-lg-3 mb-4" },
        React.createElement(
            "form",
            { onSubmit: props.handleSubmit, className: "frm-create-note d-flex flex-column" },
            React.createElement("textarea", { onChange: props.handleChange, rows: "5", value: props.currentNote }),
            React.createElement("input", { type: "submit", className: "btn btn-outline-dark mt-3", value: "Create a Note" })
        )
    );
};

var ShowNotes = function ShowNotes(props) {
    var notes = props.notes,
        deleteNote = props.deleteNote,
        category = props.category,
        markNote = props.markNote;


    switch (category) {
        case 'Completed':
            notes = notes.filter(function (note) {
                return note.completed;
            });
            break;
        case 'Incomepleted':
            notes = notes.filter(function (note) {
                return !note.completed;
            });
            break;
    }

    notes = notes.map(function (note) {
        var content = note.content,
            completed = note.completed,
            id = note.id;

        return React.createElement(
            "div",
            { key: id, className: "col-12 col-md-4 col-lg-3 mb-4" },
            React.createElement(
                "div",
                { className: "note" },
                React.createElement(
                    "p",
                    { className: completed ? 'text-decoration-line-through' : '' },
                    content
                ),
                React.createElement(
                    "div",
                    { className: "btn-group mt-3" },
                    React.createElement(
                        "button",
                        { onClick: function onClick(e) {
                                return deleteNote(id);
                            }, className: "btn btn-outline-dark" },
                        "Delete"
                    ),
                    React.createElement(
                        "button",
                        { onClick: function onClick(e) {
                                return markNote(id, completed);
                            }, className: "btn btn-outline-dark" },
                        React.createElement("i", { className: "fas " + (completed ? 'fa-times red' : 'fa-check green') })
                    )
                )
            )
        );
    });

    return React.createElement(
        React.Fragment,
        null,
        notes
    );
};

var ToDoList = function (_React$Component) {
    _inherits(ToDoList, _React$Component);

    function ToDoList(props) {
        _classCallCheck(this, ToDoList);

        var _this = _possibleConstructorReturn(this, (ToDoList.__proto__ || Object.getPrototypeOf(ToDoList)).call(this, props));

        _this.state = {
            currentNote: '',
            notes: [],
            categories: {
                All: 'active',
                Completed: '',
                Incomepleted: ''
            }
        };

        _this.Apikey = 248;
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.categoryChange = _this.categoryChange.bind(_this);
        _this.deleteNote = _this.deleteNote.bind(_this);
        _this.getCurrentActive = _this.getCurrentActive.bind(_this);
        _this.markNote = _this.markNote.bind(_this);
        return _this;
    }

    _createClass(ToDoList, [{
        key: "handleError",
        value: function handleError(error) {
            console.log(error);
        }
    }, {
        key: "getCurrentActive",
        value: function getCurrentActive(object) {
            for (var prop in object) {
                if (object[prop] === 'active') {

                    return prop;
                }
            }
            return null;
        }
    }, {
        key: "categoryChange",
        value: function categoryChange(event) {
            var category = event.target.textContent;
            var categories = Object.assign({}, this.state.categories);
            categories[this.getCurrentActive(categories)] = '';
            categories[category] = 'active';
            this.setState({ categories: categories });
        }
    }, {
        key: "handleChange",
        value: function handleChange(e) {
            var value = e.target.value;

            this.setState({
                currentNote: value
            });
        }
    }, {
        key: "markNote",
        value: function markNote(id, completed) {
            var _this2 = this;

            fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks/" + id + "/mark_" + (completed ? 'active' : 'complete') + "?api_key=248", {
                method: "PUT",
                mode: "cors"
            }).then(checkStatus).then(json).then(function (data) {
                return _this2.getNotes();
            }).catch(this.handleError);
        }
    }, {
        key: "getNotes",
        value: function getNotes() {
            var _this3 = this;

            fetch('https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=248').then(checkStatus).then(json).then(function (data) {
                return _this3.setState({ notes: data.tasks });
            }).catch(this.handleError);
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(e) {
            var _this4 = this;

            e.preventDefault();
            var currentNote = this.state.currentNote;

            if (!currentNote) {
                return;
            }

            fetch('https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=248', {
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
            }).then(checkStatus).then(json).then(function (data) {
                _this4.getNotes();
                _this4.setState({ currentNote: '' });
            }).catch(this.handleError);
        }
    }, {
        key: "deleteNote",
        value: function deleteNote(id) {
            var _this5 = this;

            fetch("https://altcademy-to-do-list-api.herokuapp.com/tasks/" + id + "?api_key=248", {
                method: 'DELETE',
                mode: 'cors'
            }).then(checkStatus).then(json).then(function (data) {
                _this5.getNotes();
            }).catch(this.handleError);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.getNotes();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    { className: "text-center" },
                    "To Do List"
                ),
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(NotesMenu, {
                            categories: this.state.categories,
                            categoryChange: this.categoryChange
                        }),
                        React.createElement(CreateNote, {
                            handleChange: this.handleChange,
                            handleSubmit: this.handleSubmit,
                            currentNote: this.state.currentNote
                        }),
                        React.createElement(ShowNotes, {
                            notes: this.state.notes,
                            deleteNote: this.deleteNote,
                            category: this.getCurrentActive(this.state.categories),
                            markNote: this.markNote
                        })
                    )
                )
            );
        }
    }]);

    return ToDoList;
}(React.Component);

ReactDOM.render(React.createElement(ToDoList, null), document.getElementById('root'));