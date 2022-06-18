import React from 'react';

class CustomerDelete extends React.Component {

    deleteCustomer(id) {
        // /api/customers/7 : 7인 고객을 삭제하겠다 이런 뜻
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() { 
        return (
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;