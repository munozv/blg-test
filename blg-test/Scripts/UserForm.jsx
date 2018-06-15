class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Firstname: "",
            Lastname: "",
            Email: "",
            Phone: "",
            ClientIpAddress: "",
            EmailIsValid: true,
            PhoneIsValid: true
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

        this.setState({ [name]: value });
       this.validateField(name, value);
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
            then((userId) => {
                window.location.assign('/React/AddressForm/' + userId);
            });
    }

    validateField(fieldName, value) {
        let isEmailValid = this.state.EmailIsValid;
        let isPhoneValid = this.state.PhoneIsValid;

        switch (fieldName) {
            case 'Email':
                isEmailValid = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/).test(value);
                break;
            case 'Phone':
                isPhoneValid = (/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/).test(value);
                break;
            default:
                break;
        }
        this.setState({
            EmailIsValid: isEmailValid,
            PhoneIsValid: isPhoneValid
        });
    }

    render() {
        return (
            <div className="UserForm">
                <br />

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="control-label"> First Name :</label>
                        <input type="text" className="form-control" name="Firstname" value={this.state.Firstname} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label className="control-label"> Last Name : </label>
                        <input type="text" className="form-control" name="Lastname" value={this.state.Lastname} onChange={this.handleInputChange} />
                    </div>
                    <div className={"form-group " + (this.state.EmailIsValid ? '' : 'has-error')}>
                        <label className="control-label"> Email : </label>
                        <input type="text" className="form-control" name="Email" value={this.state.UserEmail} onChange={this.handleInputChange} />
                    </div>
                    <div className={"form-group " + (this.state.PhoneIsValid ? '' : 'has-error')}>
                        <label className="control-label"> Phone :</label>
                        <input type="text" className="form-control" name="Phone" value={this.state.UserPhone} onChange={this.handleInputChange} />
                    </div>
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
