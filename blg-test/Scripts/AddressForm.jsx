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
            AddressLine1: "",
            AddressLine2: "",
            City: "",
            Zipcode: "",
            AddressLine1IsValid: true,
            CityIsValid: true,
            ZipcodeIsValid: true,
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

    LogAddressIntoDb() {
        return fetch('/api/addressData', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                AddressLine1: this.state.AddressLine1,
                AddressLine2: this.state.AddressLine2,
                City: this.state.City,
                Zipcode: this.state.Zipcode,
                UserId: this.state.UserId
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
            Promise.resolve(this.LogAddressIntoDb()).
                then((userId) => {
                    //  window.location.assign('/React/AddressForm/' + userId);
                });
        }
        else {
            this.setState({ IsLoading: false });
        }
    }

    validateField(fieldName, value) {
        let isAdd1Valid = this.state.AddressLine1IsValid;
        let isCityValid = this.state.CityIsValid;
        let isZipCodeValid = this.state.ZipcodeIsValid;

        switch (fieldName) {
            case 'AddressLine1':
                isAdd1Valid = value.length > 0;
                break;
            case 'City':
                isCityValid = value.length > 0;
                break;
            case 'Zipcode':
                isZipCodeValid = value.length > 0;
                break;
            case 'AddressLine2':
                break;
            default:
                isAdd1Valid = this.state.AddressLine1.length > 0;
                isCityValid = this.state.City.length > 0;
                isZipCodeValid = this.state.Zipcode.length > 0;
                break;
        }

        this.setState({
            AddressLine1IsValid: isAdd1Valid,
            CityIsValid: isCityValid,
            ZipcodeIsValid: isZipCodeValid
        });
        return (isAdd1Valid && isCityValid && isZipCodeValid)
    }

    render() {
        return (
            <div className="AddressForm">
                <br />
                <div id='overlay' style={{ visibility: this.state.IsLoading ? 'visible' : 'hidden' }} >
                    <div className="loader" style={{ position: 'absolute', left: '30%', top: '100px' }} />
                </div>
                <label className="control-label">{'First Name: ' + this.state.Firstname}</label>
                <br />
                <label className="control-label">{'Last Name: ' + this.state.Lastname}</label>
                <br />
                <label className="control-label">{'Email: ' + this.state.Email}</label>
                <br />
                <label className="control-label">{'Phone: ' + this.state.Phone}</label>
                <br />
                <label className="control-label">{'Ip Address: ' + this.state.ClientIpAddress}</label>
                <br />
                <form onSubmit={this.handleSubmit} >
                    <div className={"form-group " + (this.state.AddressLine1IsValid ? '' : 'has-error')}>
                        <label className="control-label"> Address Line 1 :</label>
                        <input type="text" className="form-control" name="AddressLine1" value={this.state.AddressLine1} onChange={this.handleInputChange} />
                    </div>
                    <div className={"form-group"}>
                        <label className="control-label"> Address Line 2 : </label>
                        <input type="text" className="form-control" name="AddressLine2" value={this.state.AddressLine2} onChange={this.handleInputChange} />
                    </div>
                    <div className={"form-group " + (this.state.CityIsValid ? '' : 'has-error')}>
                        <label className="control-label"> City : </label>
                        <input type="text" className="form-control" name="City" value={this.state.City} onChange={this.handleInputChange} />
                    </div>
                    <div className={"form-group " + (this.state.ZipcodeIsValid ? '' : 'has-error')}>
                        <label className="control-label"> Zipcode :</label>
                        <input type="text" className="form-control" name="Zipcode" value={this.state.Zipcode} onChange={this.handleInputChange} />
                    </div>
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
