import { useState, useRef } from 'react';

export const usePosts = () => {

    const errRef1 = useRef(null);
    const [error, setError] = useState(null);
    const token = JSON.parse(localStorage.getItem('theuser')).token
    const uname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];

    const getPosts = async (subG) => {
        const res = await fetch('http://localhost:5000/api/posts/getPosts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ subG })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data; // we need the data to update the page again
        }
    }
    const createPost = async (name, description, subG) => {
        const res = await fetch('http://localhost:5000/api/posts/createPost', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, name, description, subG })
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data.err, 'err');
            setError(data.err);
            errRef1.current = data.err;
        }
    }
    const createComment = async (uname, postName, commentText) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/createComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, postName, commentText })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const reportPost = async (uname, who, postName, subG, reportText, postText) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/reportPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, who, postName, subG, reportText, postText })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const getReports = async (subG, uname) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/getReports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ subG, uname })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const deleteReportedPost = async (postName, subG, _id) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/deleteReportedPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ postName, subG, _id })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const ignoreTheReport = async (subG, _id) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/ignoreTheReport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ subG, _id })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const getSavedPosts = async (uname) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/getSavedPosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const savePost = async (uname, postName) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/savePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, postName })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const unSavePost = async (uname, postName) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/unSavePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, postName })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const likePostFunc = async (uname, postName) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/upvotePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, postName })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const dislikePostFunc = async (uname, postName) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/downvotePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, postName })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const removeLike = async (uname, postName) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/unUpvotePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, postName })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    const removeDislike = async (uname, postName) => {
        setError(null);
        const res = await fetch('http://localhost:5000/api/posts/unDownvotePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, postName })
        });
        const data = await res.json();
        if (!res.ok)
            setError(data.err);
        else {
            return data;
        }
    }

    return { getPosts, createPost, createComment, reportPost, getReports, deleteReportedPost, ignoreTheReport, getSavedPosts, savePost, unSavePost, likePostFunc, removeLike, dislikePostFunc, removeDislike, error, errRef1 };
}
