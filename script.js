var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotesMenu = function NotesMenu(props) {
    var categoryChange = props.categoryChange,
        categories = props.categories;

    var buttons = [];
    for (var prop in categories) {
        buttons.push(React.createElement(
            "button",
            { key: prop, onClick: categoryChange, className: "btn btn-outline-dark me-2 " + categories[prop] },
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
        { className: "col-3" },
        React.createElement(
            "button",
            { className: "btn btn-primary" },
            " Create A Note"
        )
    );
};

var ShowNotes = function ShowNotes(props) {
    return React.createElement(
        "div",
        { className: "div-col-3" },
        React.createElement("div", { className: "post-sticks" })
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
        _this.categoryChange = _this.categoryChange.bind(_this);
        return _this;
    }

    _createClass(ToDoList, [{
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
        key: "render",
        value: function render() {
            console.log(this.state.categories);
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    { className: "text-center" },
                    " To Do List "
                ),
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(NotesMenu, { categories: this.state.categories, categoryChange: this.categoryChange }),
                        React.createElement(CreateNote, null),
                        React.createElement(ShowNotes, null)
                    )
                )
            );
        }
    }]);

    return ToDoList;
}(React.Component);

ReactDOM.render(React.createElement(ToDoList, null), document.getElementById('root'));