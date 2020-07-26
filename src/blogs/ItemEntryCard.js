import React from 'react';
import './ItemEntryCard.css';

class ItemEntryCard extends React.Component {
    constructor(props) {
        super(props);
    }

    onOpenEntry(e, id) {
        this.props.history.push('/blog/entry/' + id)
    }

    render() {
        const id = this.props.data.id
        return <div className="Card" onClick={e => this.onOpenEntry(e, id)}>
            <h6>{this.props.data.title}</h6>
            <p>by {this.props.data.owner} on {new Date(this.props.data.createDate).toLocaleString()}</p>
            <div className="BottomLine"/>
        </div>
    }
}

export default ItemEntryCard;
