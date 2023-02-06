import React from 'react';
import ItemList from '../itemList/ItemList';
import ItemDetails, { Field } from '../itemDetails/ItemDetails';
import { useState } from 'react';
import GotService from '../../services/GotService';
import RowBlock from '../rowBlock/RowBlock';
import Search from '../search/Search';
import { useMemo } from 'react';

const HousesPage = () => {

    const [selectedHouse, setSelectedHouse] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const onInput = (e) => setSearchInput(e.target.value);

    const gotSerivce = useMemo(() => {
        return new GotService();
    }, []);

    const onItemSelected = (id) => {
        setSelectedHouse(id);
    }

    const itemList = (
        <ItemList
            onItemSelected={onItemSelected}
            getData={gotSerivce.allHouses}
            renderItem={(item) => item.name}
            type='houses'
            searchInput={searchInput}
        />
    )

    const charDetails = useMemo(() => {
        return (
            <ItemDetails itemId={selectedHouse} getData={gotSerivce.getHouse} type='house'>
                <Field field='words' label='Words' />
                <Field field='region' label='Region' />
            </ItemDetails>
        )
    }, [selectedHouse, gotSerivce])

    return (
        <>
            <div className='list-container' style={{ flex: '1' }}>
                <Search onInput={onInput} />
                {itemList}
            </div>
            <div style={{ flex: '1', marginLeft: '25px' }}>
                {charDetails}
            </div>
        </>
    );
};

export default HousesPage;