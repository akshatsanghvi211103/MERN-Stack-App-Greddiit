import React, { useState, useEffect, useRef } from 'react'
import { usePosts } from '../hooks/usePosts'
import { useNavigate } from "react-router-dom";
import NewNavbar from '../components/newnavbar'
import anime from 'animejs'
import '../css/myGreddiits.css'
import Navbar from '../components/navbar'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { useFollower } from '../hooks/useFollower'
import { useFollowing } from '../hooks/useFollowing';
import { useSG } from '../hooks/useSG';

let kevVal = 0;

export default function SG() {

  const uname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];

  const postsArr = useRef([]);
  const numPage = useRef(0);
  const commChange = useRef(0);
  const theFollowing = useRef([]);
  const bannedKeywords = useRef([]);

  const navigate = useNavigate();

  let opacity = false;

  let url = window.location.href;
  let subG = url.substring(url.lastIndexOf('/') + 1);
  let urlSubG = subG;
  for (let i = 0; i < subG.length; i++) {
    if (subG[i] === '%') {
      subG = subG.substring(0, i) + ' ' + subG.substring(i + 3);
    }
  }

  const [postName, setPostName] = useState('')
  const [postCreator, setPostCreator] = useState('Creator')
  const [postDescription, setPostDescription] = useState('')
  const [postComments, setPostComments] = useState([])

  const { createPost, getPosts, createComment, savePost, likePostFunc, dislikePostFunc, removeDislike, removeLike, error, errRef1 } = usePosts()
  const { leaveSubGFunc, getSubGDetails } = useSG()
  const { reportPost } = usePosts()
  const { followUser } = useFollower()
  const { getFollowing } = useFollowing()

  const handleCLick1 = () => {
    // remove pointer events, so that the user doesn't click on the tiles while the animation is running
    document.getElementsByClassName('boxes')[0].style.pointerEvents = 'none';
    if (opacity) {
      setTimeout(() => {
        document.getElementsByClassName('title')[0].style.display = 'block';
        document.getElementsByClassName('boxes')[0].style.pointerEvents = 'auto';
      }, 1100);
      document.getElementsByClassName('icon')[0].style.display = 'none';
    } else {
      document.getElementsByClassName('title')[0].style.display = 'none';
      setTimeout(() => {
        document.getElementsByClassName('icon')[0].style.display = 'block';
        document.getElementsByClassName('boxes')[0].style.pointerEvents = 'auto';
      }, 1100);
    }
    opacity = !opacity;
  }

  const func = () => {
    const wrapper = document.getElementsByClassName('tiles')[0];

    let columns = 0, rows = 0, toggled = false;

    const toggle = () => {
      toggled = !toggled;

      document.getElementsByClassName('boxes')[0].classList.toggle('toggled');
    }
    let maxHt = 0;
    maxHt = document.getElementsByClassName('boxes')[0].clientHeight;
    document.getElementsByClassName('boxes')[0].style.height = maxHt + 'px';
    const handleOnClick = index => {
      toggle();
      anime({
        targets: '.tile',
        opacity: toggled ? 0 : 1,
        delay: anime.stagger(100, {
          grid: [columns, rows],
          from: index
        })
      });
    }

    const createTile = index => {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.style.opacity = toggled ? 0 : 1;
      tile.onclick = e => handleOnClick(index);
      return tile;
    }

    const createTiles = quantity => {
      Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
      });
    }

    const createGrid = () => {
      wrapper.innerHTML = '';
      // const size = document.getElementsByClassName('boxes')[0].clientWidth > 800 ? 40 : 50;
      const size = 40
      // columns = Math.floor(document.getElementsByClassName('boxes')[0].clientWidth / size);
      // rows = Math.floor(document.getElementsByClassName('boxes')[0].clientHeight / size);
      columns = 10
      rows = 10
      wrapper.style.setProperty('--columns', columns);
      wrapper.style.setProperty('--rows', rows);
      createTiles(columns * rows);
    }

    createGrid();

    window.onresize = () => createGrid();
  }


  const openReportModal = () => {
    document.getElementsByClassName('report-modal')[0].style.display = 'block';
    document.getElementsByClassName('sg')[0].style.filter = 'blur(5px)';
  }

  const closeReportModal = () => {
    document.getElementsByClassName('report-modal')[0].style.display = 'none';
    document.getElementsByClassName('sg')[0].style.filter = 'none';
  }

  const submitReportModal = async (e) => {
    e.preventDefault();
    let reportText = document.getElementsByName('report-modal')[0].value;
    await reportPost(uname, postCreator, postName, subG, reportText, postDescription)
    document.getElementsByName('report-modal')[0].value = '';
    closeReportModal();
  }

  const openCommentModal = () => {
    document.getElementsByClassName('create-comment-modal')[0].style.display = 'block';
    document.getElementsByClassName('sg')[0].style.filter = 'blur(5px)';
  }

  const closeCommentModal = () => {
    document.getElementsByClassName('create-comment-modal')[0].style.display = 'none';
    document.getElementsByClassName('sg')[0].style.filter = 'none';
  }

  const submitCommentModal = async (e) => {
    e.preventDefault();
    let commentText = document.getElementsByName('comment-modal')[0].value;
    postsArr.current[numPage.current].comments.push({ uname: uname, commentText: commentText })
    await createComment(uname, postName, commentText)
    document.getElementsByName('comment-modal')[0].value = ''; // clear the input
    let temp = postsArr.current[numPage.current].comments
    setPostComments([...temp])
    commChange.current = commChange.current + 1;
    closeCommentModal()
  }

  const submitCreateModal = async (e) => {
    e.preventDefault();
    let thename = document.getElementsByName('name-modal')[0].value;
    let thedescription = document.getElementsByName('description-modal')[0].value;
    await createPost(thename, thedescription, subG)
    if (errRef1.current) {
      // alert('Post name already exists')
      errRef1.current = false;
      return;
    }
    document.getElementsByName('name-modal')[0].value = '';
    document.getElementsByName('description-modal')[0].value = '';
    // dont forget to add it to the page immidiately, not working rn
    postsArr.current = postsArr.current.reverse()
    postsArr.current.push({ name: thename, postText: thedescription, uname: uname, comments: [], subG: subG, upvotedBy: 0, downvotedBy: 0, savedBy: [], reports: [] })
    postsArr.current = postsArr.current.reverse()
    // postsArr.current.push({ name: thename, postText: thedescription })
    numPage.current = 0; // important, as we want the user to see the new post being created
    // update the page
    setPostCreator(uname)
    let tempName = thename
    // for (let i = 0; i < bannedKeywords.current.length; i++) {
    //   if (tempName.includes(bannedKeywords.current[i])) {
    //     tempName = tempName.replaceAll(bannedKeywords.current[i], '****')
    //   }
    // }
    setPostName(tempName)
    let tempText = thedescription
    for (let i = 0; i < bannedKeywords.current.length; i++) {
      if (tempText.includes(bannedKeywords.current[i])) {
        tempText = tempText.replaceAll(bannedKeywords.current[i], '****')
      }
    }
    setPostDescription(tempText)
    setPostComments([])
    closeCreateModal()
    document.getElementsByClassName('left-icon')[0].style.opacity = '0.3';
    document.getElementsByClassName('left-icon')[0].style.pointerEvents = 'none';
    if (numPage.current === postsArr.current.length - 1) {
      document.getElementsByClassName('right-icon')[0].style.opacity = '0.3';
      document.getElementsByClassName('right-icon')[0].style.pointerEvents = 'none';
    } else {
      document.getElementsByClassName('right-icon')[0].style.opacity = '1';
      document.getElementsByClassName('right-icon')[0].style.pointerEvents = 'auto';
    }
  }

  const openCreateModal = () => {
    document.getElementsByClassName('create-post-modal')[0].style.display = 'block';
    document.getElementsByClassName('sg')[0].style.filter = 'blur(5px)';
  }
  const closeCreateModal = () => {
    document.getElementsByClassName('create-post-modal')[0].style.display = 'none';
    document.getElementsByClassName('sg')[0].style.filter = 'none';
  }

  useEffect(() => {
    async function fetchPosts() {
      let obj = await getPosts(subG) // or pass it from the props
      postsArr.current = obj["myPosts"]
      if (postsArr.current.length !== 0) {
        // reverse the array, to get sorting by date
        postsArr.current = postsArr.current.reverse()
        if (postsArr.current.length !== 0) {
          setPostCreator(postsArr.current[numPage.current].uname)
          setPostName(postsArr.current[0].name)
          setPostDescription(postsArr.current[0].postText)
          setPostComments(postsArr.current[0].comments)

          if (numPage.current === 0) {
            document.getElementsByClassName('left-icon')[0].style.opacity = '0.3'
            document.getElementsByClassName('left-icon')[0].style.pointerEvents = 'none'
          }
          if (numPage.current === postsArr.current.length - 1) {
            document.getElementsByClassName('right-icon')[0].style.opacity = '0.3'
            document.getElementsByClassName('right-icon')[0].style.pointerEvents = 'none'
          }
          postsArr.current[numPage.current]['downvotedby'].includes(uname) ? document.getElementsByClassName('downvote')[0].style.backgroundColor = 'rgb(238 201 249 / 96%)' : document.getElementsByClassName('downvote')[0].style.backgroundColor = 'transparent'
          postsArr.current[numPage.current]['upvotedby'].includes(uname) ? document.getElementsByClassName('upvote')[0].style.backgroundColor = 'rgb(238 201 249 / 96%)' : document.getElementsByClassName('upvote')[0].style.backgroundColor = 'transparent'
        }
      }
    }
    async function fetchSubGDetails() {
      let obj = await getSubGDetails(subG)
      let temp = obj['subGDetails'][0]
      setName(temp['name'])
      setDescription(temp['description'])
      setCreator(temp['uname'])
      bannedKeywords.current = temp['bannedKeywords']
    }
    async function fetchTheFollowing() {
      let obj = await getFollowing(uname)
      // useRef
      theFollowing.current = obj['following']
    }
    fetchPosts()
    fetchSubGDetails()
    fetchTheFollowing()
    // func()

  }, [])

  setTimeout(func, 90)
  const [name, setName] = React.useState('Greddiit Name')
  const [description, setDescription] = React.useState('Greddiit Description')
  const [creator, setCreator] = React.useState('Greddiit Creator')
  const [upvotes, setUpvotes] = React.useState(0)
  const [downvotes, setDownvotes] = React.useState(0)

  const prevSlide = () => {
    if (numPage.current > 0) {
      numPage.current = numPage.current - 1
      setPostCreator(postsArr.current[numPage.current].uname)
      setPostName(postsArr.current[numPage.current].name)
      setPostDescription(postsArr.current[numPage.current].postText)
      setPostComments(postsArr.current[numPage.current].comments)
    }
    if (numPage.current === 0) {
      document.getElementsByClassName('left-icon')[0].style.opacity = '0.3'
      document.getElementsByClassName('left-icon')[0].style.pointerEvents = 'none'
    }
    else {
      document.getElementsByClassName('left-icon')[0].style.opacity = '1'
      document.getElementsByClassName('left-icon')[0].style.pointerEvents = 'auto'
    }
    if (numPage.current === postsArr.current.length - 1) {
      document.getElementsByClassName('right-icon')[0].style.opacity = '0.3'
      document.getElementsByClassName('right-icon')[0].style.pointerEvents = 'none'
    }
    else {
      document.getElementsByClassName('right-icon')[0].style.opacity = '1'
      document.getElementsByClassName('right-icon')[0].style.pointerEvents = 'auto'
    }
  }

  const followCreator = async () => {
    await followUser(uname, postCreator)
    document.getElementsByClassName('follow-creator')[0].style.display = 'none'
  }

  const nextSlide = () => {
    if (numPage.current < postsArr.current.length - 1) {
      numPage.current = numPage.current + 1
      // just do a setTimeout if u want
      setPostCreator(postsArr.current[numPage.current].uname)
      setPostName(postsArr.current[numPage.current].name)
      setPostDescription(postsArr.current[numPage.current].postText)
      setPostComments(postsArr.current[numPage.current].comments)
    }
    if (numPage.current === 0) {
      document.getElementsByClassName('left-icon')[0].style.opacity = '0.3'
      document.getElementsByClassName('left-icon')[0].style.pointerEvents = 'none'
    }
    else {
      document.getElementsByClassName('left-icon')[0].style.opacity = '1'
      document.getElementsByClassName('left-icon')[0].style.pointerEvents = 'auto'
    }
    if (numPage.current === postsArr.current.length - 1) {
      document.getElementsByClassName('right-icon')[0].style.opacity = '0.3'
      document.getElementsByClassName('right-icon')[0].style.pointerEvents = 'none'
    }
    else {
      document.getElementsByClassName('right-icon')[0].style.opacity = '1'
      document.getElementsByClassName('right-icon')[0].style.pointerEvents = 'auto'
    }
  }

  const leaveSubG = async (e) => {
    e.preventDefault()
    await leaveSubGFunc(uname, subG)
    // setTimeout(() => {
    navigate('/subgreddiits')
    // }, 2000);
  }

  const saveThePost = async (e) => {
    e.preventDefault()
    await savePost(uname, postName)
    document.getElementsByClassName('save-post')[0].style.display = 'none'
  }

  const dislikePost = async (e) => {
    e.preventDefault()
    if (postsArr.current[numPage.current].upvotedby.includes(uname)) {
      await likePost(e)
      // do the rest also, as we still want to dislike the post
    }
    postsArr.current[numPage.current].downvotedby.includes(uname) ? await removeDislike(uname, postName) : await dislikePostFunc(uname, postName)
    postsArr.current[numPage.current].downvotedby.includes(uname) ? postsArr.current[numPage.current]['downvotedby'].pop(uname) : postsArr.current[numPage.current]['downvotedby'].push(uname)
    postsArr.current[numPage.current]['downvotedby'].includes(uname) ? document.getElementsByClassName('downvote')[0].style.backgroundColor = 'rgb(238 201 249 / 96%)' : document.getElementsByClassName('downvote')[0].style.backgroundColor = 'transparent'
  }

  const likePost = async (e) => {
    e.preventDefault()
    if (postsArr.current[numPage.current].downvotedby.includes(uname)) {
      await dislikePost(e)
    }
    postsArr.current[numPage.current].upvotedby.includes(uname) ? await removeLike(uname, postName) : await likePostFunc(uname, postName)
    postsArr.current[numPage.current].upvotedby.includes(uname) ? postsArr.current[numPage.current]['upvotedby'].pop(uname) : postsArr.current[numPage.current]['upvotedby'].push(uname)
    postsArr.current[numPage.current]['upvotedby'].includes(uname) ? document.getElementsByClassName('upvote')[0].style.backgroundColor = 'rgb(238 201 249 / 96%)' : document.getElementsByClassName('upvote')[0].style.backgroundColor = 'transparent'
  }

  return (
    <>
      {uname === creator ? <NewNavbar urlSubG={urlSubG} /> : <Navbar />}
      {/* modals */}
      <div className='create-post-modal'>
        <div className='create-post-modal-content'>
          <div className='create-post-modal-header'>
            <span className='close' onClick={closeCreateModal}>&times;</span>
            <h2>Create Post</h2>
          </div>
          <div className='create-post-modal-body'>
            <form>
              <label className='label-create-modal'>
                Title<br />
              </label>
              <input className='input-create-modal' type="text" name="name-modal" /><br />
              <label className='label-create-modal'>
                Description<br />
              </label>
              <textarea id="description" name="description-modal" rows="6" cols="37"></textarea><br />
              {error ? <p className='error-create-modal'>{error}</p> : null}
              <input onClick={submitCreateModal} className='submit-create-modal' type="submit" value="Create" />
            </form>
          </div>
        </div>
      </div>
      <div className='create-comment-modal'>
        <div className='create-comment-modal-content'>
          <div className='create-comment-modal-header'>
            <span className='close' onClick={closeCommentModal}>&times;</span>
            <h2>Add Comment</h2>
          </div>
          <div className='create-comment-modal-body'>
            <form>
              <textarea id="commentArea" name="comment-modal" rows="8" cols="37"></textarea><br />
              <input onClick={submitCommentModal} className='submit-comment-modal' type="submit" value="Comment" />
            </form>
          </div>
        </div>
      </div>
      <div className='report-modal'>
        <div className='report-modal-content'>
          <div className='report-modal-header'>
            <span className='close' onClick={closeReportModal}>&times;</span>
            <h2>Report Post</h2>
          </div>
          <div className='report-modal-body'>
            <form>
              <label className='label-report-modal'>
                Concern<br />
              </label>
              <textarea id="reportArea" name="report-modal" rows="6" cols="37"></textarea><br />
              <input name='report-modal' onClick={submitReportModal} className='submit-report-modal' type="submit" value="Report" />
            </form>
          </div>
        </div>
      </div>


      <div className='sg'>
        <div className='sgDetails'>
          <div className='image-container'><div className='image'></div></div>
          <div className='sg-details'>SubG Name: {name}</div>
          <div className='sg-details'>Desc: {description}</div>
          <div className='sg-details'>Creator: {creator}</div>
          <div className='create-post'><button onClick={openCreateModal}>Create Post</button></div>
          {uname !== creator ? <div className='create-post'><button className='leave' onClick={leaveSubG}>Leave</button></div> : null}
        </div>
        <div className='posts'>
          <div className='sg-heading'>
            <button onClick={prevSlide} className='icon1'><KeyboardDoubleArrowLeftOutlinedIcon className='left-icon' fontSize='large' /></button>
            Posts
            <button onClick={nextSlide} className='icon2'><KeyboardDoubleArrowRightOutlinedIcon className='right-icon' fontSize='large' /></button>
          </div>
          {postsArr.current.length === 0 ? <div className='no-posts'>No posts yet</div> :
            <div className='each-post'>
              <div className='boxes' onClick={handleCLick1}>
                <div className='tiles'></div>
                <div className='centered title'>
                  <div className='posted-by'>-{postCreator}</div>
                  <div className='post-name'><strong>{postName}</strong></div>
                  <div className='posted-text'>
                    {postDescription}
                  </div>
                </div>
                <div className="centered icon">
                  <div className='comments-heading'><strong>Comments</strong></div>
                  {postComments.map((comment) => {
                    return (
                      <div key={kevVal++} className='each-comment'>
                        <div className='commenter'>{comment.uname}</div>
                        <div className='comment-text'>{comment.commentText}</div>
                      </div>
                    )
                  }
                  )}
                </div>
              </div>
              <div>Click to view comments</div>
              <div className='other-stuff'>
                <button onClick={dislikePost} className='vote-icons downvote'><ThumbDownOutlinedIcon className='vote-icons' fontSize='medium' /></button>
                {uname === postCreator || theFollowing.current.includes(postCreator) ? null : <button onClick={followCreator} className='post-icons follow-creator'>Follow</button>}
                <button onClick={openCommentModal} className='post-icons'>Comment</button>
                {postsArr.current[numPage.current]["savedBy"].includes(uname) ? null : <button onClick={saveThePost} className='post-icons save-post'>Save</button>}
                {uname === postCreator ? null : <button className='post-icons report-btn' onClick={openReportModal}>Report</button>}
                <button onClick={likePost} className='vote-icons upvote'><ThumbUpOutlinedIcon className='vote-icons' fontSize='medium' /></button> {/* Make this a toggle, and also dont forget to mention its count */}
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}
