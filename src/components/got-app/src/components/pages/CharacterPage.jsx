import React from 'react';
import ItemList from '../itemList/ItemList';
import ItemDetails, { Field } from '../itemDetails/ItemDetails';
import { useState } from 'react';
import GotService from '../../services/GotService';
import RowBlock from '../rowBlock/RowBlock';
import Search from '../search/Search';
import { useMemo } from 'react';

const CharacterPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const onInput = (e) => setSearchInput(e.target.value);

    const gotSerivce = useMemo(() => {
        return new GotService();
    }, []);

    const onItemSelected = (id) => {
        setSelectedChar(id);
    }

    const itemList = (
        <ItemList
            onItemSelected={onItemSelected}
            getData={gotSerivce.allCharacters}
            renderItem={(item) => `${item.name} (${item.gender})`}
            type='characters'
            searchInput={searchInput}
        />
    )

    const charDetails = useMemo(() => {
        return (
            <ItemDetails itemId={selectedChar} getData={gotSerivce.getCharacter}>
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>
        )
    }, [selectedChar, gotSerivce])

    return (
        <>
            <div className='list-container' style={{ flex: '1' }}>
                <Search onInput={onInput} />
                {itemList}
            </div>
            <div style={{ flex: '1', marginLeft: '25px' }}>
                {charDetails}
            </div>
            {/* {itemList} */}
            {/* {charDetails} */}
        </>
    );
};

export default CharacterPage;