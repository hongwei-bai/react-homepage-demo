import React from 'react';

import './DashboardCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class DashboardCard extends React.Component {
    redirect(thisPtr) {
        thisPtr.props.history.push(thisPtr.props.data.actionPath)
    }

    render() {
        const thisPtr = this
        return (
            <Card style={{
                width: '18rem',
                height: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '0.1em',
                marginBottom: '0.1em'
            }}>
                <div className="CardInner">
                    <Card.Img variant="top" src={this.props.data.image}/>
                    <Card.Body>
                        <Card.Title>{this.props.data.title}</Card.Title>
                        <Card.Text>
                            {this.props.data.content}
                        </Card.Text>
                        <Button variant="primary" disabled={!this.props.data.enabled}
                                onClick={() => {
                                    this.redirect(thisPtr)
                                }}>{this.props.data.actionButton}</Button>
                    </Card.Body>
                </div>
            </Card>
        )
    }
}

export default withRouter(DashboardCard);
