class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Firstname: "",
            Lastname: "",
            UserEmail: "",
            UserPhone: "",
            ClientIpAddress: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('http://api.ipstack.com/134.201.250.155?access_key=48db7db2e7cb65734ccbc885fc42954c&output=json')
            .then(res => res.json())
            .then(json => {
                this.setState({ ClientIpAddress: json.ip });
            });
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
        return fetch('/api/userData', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: this.state.Firstname,
                lastname: this.state.Lastname,
                Email: this.state.UserEmail,
                Phone: this.state.UserPhone,
                IpAddress: this.state.ClientIpAddress

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson.Id;
            }).catch((error) => {
                console.error(error);
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        Promise.resolve(this.LogUserIntoDb()).
            then((user) => {
                alert(user);
            });
    }

    render() {
        return (
            <div className="UserForm">
                <form onSubmit={this.handleSubmit}>
                    <label> First Name :
                        <input type="text" name="Firstname" value={this.state.Firstname} onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label> Last Name :
                        <input type="text" name="Lastname" value={this.state.Lastname} onChange={this.handleInputChange} />
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
