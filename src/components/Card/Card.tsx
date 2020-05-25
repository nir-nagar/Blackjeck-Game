import React from 'react';
import './Card.css';
import { connect } from 'react-redux';


class _Card extends React.Component<any, any> {
    render() {
        const { url } = this.props
        return (
            <div className="Card">
                <img src={`${url}`} />
            </div>
        );
    }
}

export const Card = connect()(_Card);
