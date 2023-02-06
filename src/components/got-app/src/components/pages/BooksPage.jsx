import React from 'react';
import ItemList from '../itemList/ItemList';
import GotService from '../../services/GotService';
import { useNavigate } from 'react-router-dom';

const BooksPage = () => {

    const router = useNavigate();

    const gotSerivce = new GotService();

    return (
        <ItemList
            onItemSelected={(id) => {
                router(id)
            }}
            getData={gotSerivce.getAllBooks}
            renderItem={(item) => item.name}
            type='books'
        />
    );
};

export default BooksPage;