import React from 'react';
import './itemList.css';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import { useMemo } from 'react';

const ItemList = ({ onItemSelected, getData, renderItem, type, searchInput }) => {

    const [itemList, setItemList] = useState([]);
    const filteredItemList = useMemo(() => {
        if (type === 'characters' || type === 'houses') {
            return itemList.filter(el => el.name.toLowerCase().includes(searchInput.toLowerCase()));
        } else {
            return itemList;
        }
    }, [itemList, searchInput, type])

    useEffect(() => {
        if (type === 'characters') {
            for (let i = 1; i < 44; i += 1) {
                getData(i).then(data => {
                    setItemList(prevState => {
                        let newState = [...prevState, ...data];
                        newState.sort((a, b) => a.name.localeCompare(b.name));
                        return newState;
                    })
                })
            }
        } else if (type === 'houses') {
            for (let i = 1; i < 10; i += 1) {
                getData(i).then(data => {
                    setItemList(prevState => {
                        let newState = [...prevState, ...data];
                        newState.sort((a, b) => a.name.localeCompare(b.name));
                        return newState;
                    })
                })
            }
        } else {
            getData()
                .then(itemList => {
                    setItemList(itemList)
                })
        }
    }, [])

    return (
        itemList.length > 0
            ?
            <ul className='list'>
                {filteredItemList.map((item) => {
                    const label = renderItem(item);

                    return (
                        <li
                            key={item.id}
                            className="list-item"
                            onClick={() => onItemSelected(item.id)}>
                            {label}
                        </li>
                    )
                })}
            </ul>
            :
            <Spinner />
    );
};

export default ItemList;