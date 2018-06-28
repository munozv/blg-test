class SendConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
       
        };
       }
    render() {
        return (
            <div className="SendConfirmation">
                <br />
                Thank you for using blg-test ! An Email will be send to your address with all the informations.
            </div>
        );
    }
}

ReactDOM.render(
    <SendConfirmation />,
    document.getElementById('content')
);
