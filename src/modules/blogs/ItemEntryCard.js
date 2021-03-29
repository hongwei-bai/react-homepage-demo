import React from 'react';
import './ItemEntryCard.css';
import intl from 'react-intl-universal';

class ItemEntryCard extends React.Component {
    onOpenEntry(e, id) {
        this.props.history.push('/blog/entry/' + id)
    }

    render() {
        const id = this.props.data.id
        return <div className="Card" onClick={e => this.onOpenEntry(e, id)}>
            <h6>{this.props.data.title}</h6>
            <p>{intl.get("blogByInList").replace("{author}", this.props.data.owner)
                .replace("{date}", new Date(this.props.data.createDate).toLocaleString())}</p>
            <div className="BottomLine"/>
        </div>
    }
}

export default ItemEntryCard;
