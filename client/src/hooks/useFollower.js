export const useFollower = () => {
    const deleteFollower = async (uname, follower) => { // pass the follower's uname
        const res = await fetch('http://localhost:5000/api/user/deleteFollower', { // maybe we need to pass variables into the url...or lets jsut use POST
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('theuser')).token
            },
            body: JSON.stringify({ uname, follower })
        });
        await res.json();
    }
    const getFollowers = async (uname) => {
        const res = await fetch('http://localhost:5000/api/user/getFollowers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('theuser')).token
            },
            body: JSON.stringify({ uname })
        });
        const data = await res.json(); // the data is an array of followers
        if (res.ok) {
            // store this in a global state
            return data;
        }
    }

    const followUser = async (uname, follower) => {
        const res = await fetch('http://localhost:5000/api/user/followUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('theuser')).token
            },
            body: JSON.stringify({ uname, follower })
        });
        await res.json();
    }
    
    return { deleteFollower, getFollowers, followUser }
}