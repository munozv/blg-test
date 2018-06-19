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
            PhoneIsValid: true,
            FirstnameIsValid: true,
            LastnameIsValid: true,
            IsLoading: false
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
                Email: this.state.Email,
                Phone: this.state.Phone,
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
        this.setState({ IsLoading: true });
        if (this.validateField("", "")) {
            Promise.resolve(this.LogUserIntoDb()).
                then((userId) => {
                    window.location.assign('/React/AddressForm/' + userId);
                });
        }
        else {
            this.setState({ IsLoading: false });
        }
    }

    validateField(fieldName, value) {
        let isEmailValid = this.state.EmailIsValid;
        let isPhoneValid = this.state.PhoneIsValid;
        let isFirstnameValid = this.state.FirstnameIsValid;
        let isLastnameValid = this.state.LastnameIsValid;
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,}$/;
        let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        switch (fieldName) {
            case 'Email':
                isEmailValid = emailRegex.test(value);
                break;
            case 'Phone':
                isPhoneValid = phoneRegex.test(value);
                break;
            case 'Firstname':
                isFirstnameValid = value.length > 0;
                break;
            case 'Lastname':
                isLastnameValid = value.length > 0;
                break;
            default:
                isEmailValid = emailRegex.test(this.state.Email);
                isPhoneValid = phoneRegex.test(this.state.Phone);
                isFirstnameValid = this.state.Firstname.length > 0;
                isLastnameValid = this.state.Lastname.length > 0;
                break;
        }
        this.setState({
            EmailIsValid: isEmailValid,
            PhoneIsValid: isPhoneValid,
            FirstnameIsValid: isFirstnameValid,
            LastnameIsValid: isLastnameValid
        });
        return (isEmailValid && isPhoneValid && isFirstnameValid && isLastnameValid)
    }

    render() {
        return (
            <div className="UserForm">
                <br />
                <div id='overlay' style={{ visibility: this.state.IsLoading ? 'visible' : 'hidden' }} >
                    <div className="loader" style={{ position: 'absolute', left: '30%', top: '100px' }} />
                </div>
                <form onSubmit={this.handleSubmit} >
                    <div className={"form-group " + (this.state.FirstnameIsValid ? '' : 'has-error')}>
                        <label className="control-label"> First Name :</label>
                        <input type="text" className="form-control" name="Firstname" value={this.state.Firstname} onChange={this.handleInputChange} />
                    </div>
                    <div className={"form-group " + (this.state.LastnameIsValid ? '' : 'has-error')}>
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
