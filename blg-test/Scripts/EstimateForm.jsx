class EstimateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserId: 0,
            Firstname: "",
            Lastname: "",
            Email: "",
            Phone: "",
            ClientIpAddress: "",
            AddressId: 0,
            AddressLine1: "",
            AddressLine2: "",
            City: "",
            State: "",
            Zipcode: "",
            ApiAddress: "",
            RentEstimate: "",
            EstimateId: 0,
            LowRentEstimate: "",
            HighRentEstimate: "",
            NoApiRent: false,
            IsRentEstimateFromAPI: "",
            UserRent: "",
            UserRentIsValid: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var hrefArray = window.location.href.split('/');

        fetch('/api/addressData/' + hrefArray[hrefArray.length - 1], {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        }).then(res => res.json())
            .then(json => {
                this.setState({
                    AddressId: hrefArray[hrefArray.length - 1],
                    AddressLine1: json.AddressLine1,
                    AddressLine2: json.AddressLine2,
                    City: json.City,
                    State: json.State,
                    Zipcode: json.Zipcode,
                    UserId: json.UserId,
                });
                fetch('/api/userData/' + json.UserId, {
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
                        });
                    });
                fetch('/api/EstimateData?address=' + encodeURI(this.state.AddressLine1 + ' ' + this.state.AddressLine2) + '&citystatezip=' + encodeURI(this.state.City + ' ' + this.state.State + ' ' + this.state.Zipcode), {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    }
                }).then(res => res.json())
                    .then(json => {
                        this.setState({
                            EstimateId: json.Id,
                            ApiAddress: json.ApiAddress,
                            RentEstimate: json.RentEstimate,
                            LowRentEstimate: json.LowRentRange,
                            HighRentEstimate: json.HighRentRange,
                            IsRentEstimateFromAPI: json.IsRentEstimateFromAPI,
                            IsLoading: false
                        });
                    }).catch(error => {
                        this.setState({
                            EstimateId: "0",
                            NoApiRent: true
                        });
                    })
            }).catch(error => {
                this.setState({
                    EstimateId: "0",
                    NoApiRent: true
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

    LogEstimateIntoDb() {
        return fetch('/api/UserEstimateData', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                AddressId: this.state.AddressId,
                RentEstimate: this.state.UserRent
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
            Promise.resolve(this.LogEstimateIntoDb()).
                then((UserEstimateId) => {
                    window.location.assign('/React/SendConfirmation?AddressId=' + this.state.AddressId
                        + '&UserId=' + this.state.UserId + '&UserEstimateId=' + UserEstimateId
                        + '&EstimateId=' + this.state.EstimateId);
                });
        }
        else {
            this.setState({ IsLoading: false });
        }
    }

    validateField(fieldName, value) {
        let isUserRentValid = this.state.UserRentIsValid;
        let numberRegex = /^[0-9]*$/;


        switch (fieldName) {
            case 'UserRent':
                isUserRentValid = value.length > 0;
                isUserRentValid = numberRegex.test(value);
                break;
            default:
                isUserRentValid = this.state.UserRent.length > 0 && numberRegex.test(this.state.UserRent);
                break;
        }

        this.setState({
            UserRentIsValid: isUserRentValid
        });
        return (isUserRentValid);
    }

    render() {
        return (
            <div className="EstimateForm">
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
                <label className="control-label">{'Address Line 1: ' + this.state.AddressLine1}</label>
                <br />
                <label className="control-label">{'Address Line 2: ' + this.state.AddressLine2}</label>
                <br />
                <label className="control-label">{'City: ' + this.state.City}</label>
                <br />
                <label className="control-label">{'State: ' + this.state.State}</label>
                <br />
                <label className="control-label">{'Zipcode: ' + this.state.Zipcode}</label>
                <div style={{ display: this.state.NoApiRent ? 'none' : 'block' }}>

                    <label className="control-label">{'Rent Estimate: ' + this.state.RentEstimate}</label>
                    <br />
                    <label className="control-label">{'Low Rent Range: ' + this.state.LowRentEstimate}</label>
                    <br />
                    <label className="control-label">{'High Rent Range: ' + this.state.HighRentEstimate}</label>
                    <br />
                    <label className="control-label">{'Address Reference: ' + this.state.ApiAddress}</label>
                    <br />
                    <label className="control-label">{'Rent was calculated from property Zestimate: ' + !this.state.IsRentEstimateFromAPI}</label>
                </div>
                <br />
                <div style={{ display: this.state.NoApiRent ? 'block' : 'none' }}>
                    <label className="control-label has-error">{'Unable to get a rent from Zillow.'}</label>
                </div>
                <br />
                <form onSubmit={this.handleSubmit} >
                    <div className={"form-group " + (this.state.UserRentIsValid ? '' : 'has-error')}>
                        <label className="control-label"> Please Enter your rent if different :</label>
                        <input type="text" className="form-control" name="UserRent" value={this.state.UserRent} onChange={this.handleInputChange} />
                    </div>
                    <input type="submit" name="SubmitButton" value="Submit" />
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <EstimateForm />,
    document.getElementById('content')
);
