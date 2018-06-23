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
            AddressLine1: "",
            AddressLine2: "",
            City: "",
            State: "",
            Zipcode: "",

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
                            IsLoading: false
                        });
                        fetch('/api/EstimateData?address=' + encodeURI(this.state.AddressLine1 + ' ' + this.state.AddressLine2) + '&citystatezip=' + encodeURI(this.state.City + ' ' + this.state.State + ' ' + this.state.Zipcode), {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                            }
                        }).then(res => res)
                            .then(json => {
                                
                            });
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
            Promise.resolve(this.LogEstimateIntoDb()).
                then((addressId) => {
                    // window.location.assign('/React/EstimateForm/' + addressId);
                });
        }
        else {
            this.setState({ IsLoading: false });
        }
    }

    validateField(fieldName, value) {
        return true;
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
                <br />
                <br />
            </div>
        );
    }
}

ReactDOM.render(
    <EstimateForm />,
    document.getElementById('content')
);
