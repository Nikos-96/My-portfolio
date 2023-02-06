import React from 'react';
import { useState } from 'react';
import './PostSpawner.css';

const PostSpawner = ({ spawnPosts, removeAllPosts, setLimit, showSpawner, setShowSpawner }) => {

    const [addValue, setAddValue] = useState('');
    const [value, setValue] = useState('');
    const [pageLimit, setPageLimit] = useState('');

    const onPostsSpawn = (e, n, type) => {
        e.preventDefault();
        spawnPosts(n, type)
    }

    const onLimitChange = (e, n) => {
        e.preventDefault();
        if (n < 1) {
            setLimit(1);
        } else {
            setLimit(+n);
        }
    }

    return (
        <div className='post-spawner' style={{ display: showSpawner ? 'block' : 'none' }}>
            <h3>Posts tool</h3>
            <form>
                Add posts
                <input
                    type='number'
                    value={addValue}
                    onChange={(e) => setAddValue(e.target.value)}
                />
                <button
                    style={{ marginLeft: '5px' }}
                    onClick={(e) => onPostsSpawn(e, addValue, 'add')}
                >
                    Add
                </button>
            </form>
            <form>
                Set posts amount
                <input
                    type='number'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    style={{ marginLeft: '5px' }}
                    onClick={(e) => onPostsSpawn(e, value, 'set')}
                >
                    Set
                </button>
            </form>
            <form>
                Set custom page limit
                <input
                    type='number'
                    value={pageLimit}
                    onChange={(e) => setPageLimit(e.target.value)}
                />
                <button
                    style={{ marginLeft: '5px' }}
                    onClick={(e) => onLimitChange(e, pageLimit)}
                >
                    Set
                </button>
            </form>
            <button onClick={removeAllPosts}>Remove all posts</button>
            <button
                className='close-btn'
                onClick={() => setShowSpawner(false)}
            >
                X</button>
        </div>
    );
};

export default PostSpawner;