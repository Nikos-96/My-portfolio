import AppHeader from './components/app-header/AppHeader';
import PostAddForm from './components/post-add-form/PostAddForm';
import PostList from './components/post-list/PostList';
import PostStatusFilter from './components/post-status-filter/PostStatusFilter';
import SearchPanel from './components/search-panel/SearchPanel';
import { useMemo, useRef, useState } from 'react';
import './styles/PostsApp.css'
import { useEffect } from 'react';
import Pagination from './pagination/Pagination';
import { getPageCount, splitData } from './utils/pages';
import PostSpawner from './components/post-spawner/PostSpawner';


const PostsApp = () => {

    const [posts, setPosts] = useState([]);
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showSpawner, setShowSpawner] = useState(false);

    let prevTotalPosts = useRef(0);

    useEffect(() => {
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3')
                .then(res => res.json())
                .then(data => {
                    const posts = data.map(el => {
                        return {
                            id: el.id,
                            label: el.body,
                            important: false,
                            like: false
                        }
                    })
                    setPosts(posts);
                    setLoading(false);
                })
        }, 2000);
    }, [])

    const addItem = (body) => {
        const newItem = {
            label: body,
            like: false,
            important: false,
            id: Date.now()
        }
        setPosts([...posts, newItem]);
    }

    const searchPost = (items, term) => {
        if (term.length === '') {
            return items;
        }

        return items.filter(item => item.label.includes(term));
    }

    const updateSearch = (term) => {
        setTerm(term);
    }

    const filterPost = (items, filter) => {
        if (filter === 'like') {
            return items.filter(item => item.like);
        } else {
            return items;
        }
    }

    const onToggleImportant = (id) => {
        setPosts(prevState => prevState.map(el => el.id === id ? { ...el, important: !el.important } : el));
    }

    const onToggleLiked = (id) => {
        setPosts(prevState => prevState.map(el => el.id === id ? { ...el, like: !el.like } : el));
    }

    const onPostRemove = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (p) => setPage(p)

    const spawnPosts = async (n, type) => {
        const result = [];
        setLoading(true);
        for (let i = 0; i < n; i += 1) {
            try {
                const random = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
                const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${random}`)
                    .then(res => res.json());
                const post = {
                    id: random + Date.now(),
                    label: data.body,
                    important: false,
                    like: false
                }
                result.push(post);
            }
            catch (e) {
                console.error(e.message);
            }
        };
        if (type === 'set') {
            setPosts(result);
        } else if (type === 'add') {
            setPosts(prevState => [...prevState, ...result]);
        }
        setLoading(false);
    };

    const removeAllPosts = () => {
        setPosts([]);
    }

    const liked = posts.filter(post => post.like).length;
    const allPosts = posts.length

    const splittedAndVisibleData = useMemo(() => {
        const visiblePosts = filterPost(searchPost(posts, term), filter);
        const pagesCount = getPageCount(visiblePosts.length, limit);
        if (pagesCount > 0 && page > pagesCount) {
            setPage(pagesCount);
        }
        if (posts.length > prevTotalPosts.current) {
            setPage(pagesCount);
            prevTotalPosts.current = posts.length;
        }
        setTotalPages(pagesCount);
        const splittedData = splitData(visiblePosts, +limit, totalPages);
        if (visiblePosts.length === 0) {
            return visiblePosts;
        } else {
            return page > pagesCount ? splittedData[1] : splittedData[page];
        }
    }, [page, posts, term, filter, limit, totalPages]);

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [page])

    return (
        <div className='PostsApp'>
            <div className='PostAppContainer'>
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div>
                    Show:
                    <select value={limit} onChange={(e) => setLimit(e.target.value)}>
                        <option value={+5}>5</option>
                        <option value={+10}>10</option>
                        <option value={+15}>15</option>
                        <option value={+9999999}>All</option>
                    </select>
                    <div className='posts-tool'>
                        <button
                            className='btn open-spawner'
                            onClick={() => setShowSpawner(!showSpawner)}
                        >
                            Open posts tool</button>
                        <PostSpawner
                            spawnPosts={spawnPosts}
                            removeAllPosts={removeAllPosts}
                            setLimit={setLimit}
                            showSpawner={showSpawner}
                            setShowSpawner={setShowSpawner}
                        />
                    </div>
                </div>
                <div className='search-panel'>
                    <SearchPanel updateSearch={updateSearch} />
                    <PostStatusFilter
                        filter={filter}
                        setFilter={setFilter}
                    />
                </div>
                <PostList
                    visiblePosts={splittedAndVisibleData}
                    posts={posts}
                    onPostRemove={onPostRemove}
                    onToggleLiked={onToggleLiked}
                    onToggleImportant={onToggleImportant}
                    loading={loading}
                />
                <Pagination
                    changePage={changePage}
                    page={page}
                    totalPages={totalPages}
                />
                <PostAddForm onAdd={addItem} />
            </div>
        </div>
    );
}

export default PostsApp;