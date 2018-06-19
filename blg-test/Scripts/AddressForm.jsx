class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: 0,
            Firstname: "",
            Lastname: "",
            Email: "",
            Phone: "",
            ClientIpAddress: "",
            EmailIsValid: true,
            PhoneIsValid: true,
            FirstnameIsValid: true,
            LastnameIsValid: true,
            IsLoading: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var hrefArray = window.location.href.split('/');

        fetch('/api/userData/' + hrefArray[hrefArray.length - 1], {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }).then(res => res.json())
            .then(json => {
                this.setState({
                    UserId: json.Id,
                    Firstname: json.FirstName,
                    Lastname: json.LastName,
                    Email: json.Email,
                    Phone: json.Phone,
                    ClientIpAddress: json.IpAddress,
                    IsLoading: false
                });
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
            <div className="AddressForm">
                <br />
                <div id='overlay' style={{ visibility: this.state.IsLoading ? 'visible' : 'hidden' }} >
                    <div className="loader" style={{ position: 'absolute', left: '30%', top: '100px' }} />
                </div>
                <label className="control-label">{'First Name: ' + this.state.Firstname}</label>
                <br/>
                <label className="control-label">{'Last Name: ' + this.state.Lastname}</label>
                <br />
                <label className="control-label">{'Email: ' + this.state.Email}</label>
                <br />
                <label className="control-label">{'Phone: ' + this.state.Phone}</label>
                <br />
                <label className="control-label">{'Ip Address: ' + this.state.ClientIpAddress}</label>
                <br />
                <form onSubmit={this.handleSubmit} >
                    <input type="submit" name="SubmitButton" value="Submit" />
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <AddressForm />,
    document.getElementById('content')
);
