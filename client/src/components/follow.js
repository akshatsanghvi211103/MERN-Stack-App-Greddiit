import '../css/all.css';
import React, { useEffect } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import { useFollower } from '../hooks/useFollower';
import { useFollowing } from '../hooks/useFollowing';

export default function Follow() {
  // so I get the arrays from the backend to the local storage in the beginning itself, just like the other details
  const [followers, setFollowers] = useState([]);
  const [followersChange, setFollowersChange] = useState(0);
  const [following, setFollowing] = useState([]);
  const [followingChange, setFollowingChange] = useState(0);
  const { deleteFollower, getFollowers } = useFollower();
  const { deleteFollowing, getFollowing } = useFollowing();
  const uname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];


  const handleClick1 = async (e) => {
    // e.preventDefault();
    let idVal = e.currentTarget.id;
    await deleteFollower(uname, idVal); // the id contains the uname of the follower
    var arr = followers;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === idVal) {
        arr.splice(i, 1);
        break;
      }
    }
    setFollowersChange(followersChange + 1);
  }
  
  const handleClick2 = async (e) => {
    let idVal = e.currentTarget.id;
    await deleteFollowing(uname, idVal);
    var arr = following;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === idVal) {
        arr.splice(i, 1);
        break;
      }
    }
    setFollowingChange(followingChange + 1);
  }
  
  useEffect(() => { // can i make useEffect async?
    // get the followers and following from the backend when the component is rendered
    const uname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];
    async function fetchData() {
      let objectFollowers = await getFollowers(uname);
      let objectFollowing = await getFollowing(uname);
      var arrFollowers = Object.values(objectFollowers['followers']);
      var arrFollowing = Object.values(objectFollowing['following']);
      setFollowers(arrFollowers);
      setFollowing(arrFollowing);
    }
    fetchData();
  }, [  ]);

  return (
    <div>
      <div className="flex">
        <div className="me">
          <div className="alternate"><div>Followers<br />{followers.length}</div></div>
          <div className="fadedbox">
            <strong>
              <div className="heading"><strong>Followers</strong></div>
              <br />
              {followers && followers.map((follower) => (
                <div key={follower + followersChange * 3} className="head-stuff">{follower} <button id={follower} onClick={handleClick1}><DeleteOutlineIcon fontSize='small' /></button></div>
              ))}
            </strong>
          </div>
        </div>
        <div className="me">
          <div className="alternate"><div>Following<br />{following.length}</div></div>
          <div className="fadedbox">
            <strong>
              <div className="heading"><strong>Following</strong></div>
              <br />
              {following && following.map((follow) => (
                <div key={follow + followingChange * 7} className="head-stuff">{follow} <button id={follow} onClick={handleClick2}><DeleteOutlineIcon fontSize='small' /></button></div>
              ))}
            </strong>
          </div>
        </div>
      </div>
    </div>
  )
}
