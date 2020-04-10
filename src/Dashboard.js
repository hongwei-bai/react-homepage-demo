import React from 'react';

import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Card} from 'react-bootstrap';

class Dashboard extends React.Component {
    render() {
        return (
            <ul className="Dashboard">
                {this.props.data.map(function (card, _) {
                    return <li>
                        <Card style={{
                            width: '18rem',
                            height: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '0.1em',
                            marginBottom: '0.1em'
                        }}>
                            <Card.Img variant="top" src={card.image}/>
                            <Card.Body>
                                <Card.Title>{card.title}</Card.Title>
                                <Card.Text>
                                    {card.update}
                                </Card.Text>
                                <Button variant="primary">Details</Button>
                            </Card.Body>
                        </Card>
                    </li>
                })}
            </ul>
        );
    }
}

export default Dashboard;
