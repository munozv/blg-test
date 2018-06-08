class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: "",
            UserEmail: "",
            UserPhone: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    LogUserIntoDb() {
        fetch('/DbApi/LogUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.UserName,
                UserEmail: this.state.UserEmail,
                UserPhone: this.state.UserPhone
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson.UserId;
            }).catch((error) => {
                console.error(error);
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (1) {
            var userId = LogUserIntoDb();
        }
    }
    render() {
        return (
            <div className="UserForm">
                <form onSubmit={this.handleSubmit}>
                    <label> Full Name :
                        <input type="text" name="UserName" value={this.state.UserName} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label> Email :
                        <input type="text" name="UserEmail" value={this.state.UserEmail} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label> Phone :
                        <input type="text" name="UserPhone" value={this.state.UserPhone} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <input type="submit" name="SubmitButton" value="Submit" />
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <UserForm />,
    document.getElementById('content')
);
