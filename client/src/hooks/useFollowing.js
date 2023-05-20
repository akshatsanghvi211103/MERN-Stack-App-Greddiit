export const useFollowing = () => {
    const token = JSON.parse(localStorage.getItem('theuser')).token;
    const deleteFollowing = async (uname, followingPerson) => { // pass the following's uname
        const res = await fetch('http://localhost:5000/api/user/deleteFollowing', {
            method: 'POST',
            // it the tut, they did ${user.token}
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname, followingPerson })
        });
        await res.json();
    }
    const getFollowing = async (uname) => {
        const res = await fetch('http://localhost:5000/api/user/getFollowing', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ uname })
        });
        const data = await res.json(); // the data is an array of following
        if (res.ok) {
            // store this in a global state
            return data;
        }
    }
    return { deleteFollowing, getFollowing }
}