class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
       
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <div className="UserForm">
                <br />
                FINISHED !
            </div>
        );
    }
}

ReactDOM.render(
    <UserForm />,
    document.getElementById('content')
);
