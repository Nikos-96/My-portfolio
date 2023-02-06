import React from 'react';
import './ItemDetails.css';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Field = ({ item, field, label }) => {
    return (
        <li className="list-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export { Field };

const ItemDetails = (props) => {

    const { itemId, getData } = props;

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (itemId) {
            setLoading(true);
            getData(itemId)
                .then(item => {
                    setItem(item);
                    setLoading(false);
                })
                .catch((e) => {
                    setError(true);
                    console.log(e)
                })
        }
    }, [itemId, getData])


    let content;
    if (loading) {
        content = <Spinner />;
    } else {
        content = (
            item
                ?
                <div className="item-details" >
                    <h4>{item.name}</h4>
                    <ul className="list">
                        {
                            React.Children.map(props.children, (child) => {
                                return React.cloneElement(child, { item })
                            })
                        }
                    </ul>
                </div>
                : <span className='select-error'>Please select an item</span>
        );
    }

    return (
        <>
            {error
                ? <ErrorMessage />
                : content
            }
        </>
    );
};

export default ItemDetails;