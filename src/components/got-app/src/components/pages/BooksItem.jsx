import React from 'react';
import GotService from '../../services/GotService';
import ItemDetails, { Field } from '../itemDetails/ItemDetails';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BooksItem = () => {

    const { id } = useParams();

    const gotSerivce = new GotService();



    return (
        <div className='list-container'>
            <Link to='/got-app/books/'>
                <button>{'<<< Back'}</button>
            </Link>
            <ItemDetails itemId={id} getData={gotSerivce.getBook} type='book'>
                <Field field='authors' label='Authors' />
                <Field field='released' label='Released' />
                <Field field='numberOfPages' label='Pages' />
            </ItemDetails>
        </div>

    );
};

export default BooksItem;
