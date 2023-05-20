// import React from 'react'
// import { useState } from 'react'
// import { useSG } from '../hooks/useSG'
// import '../css/myGreddiits.css'

// export default function GreddiitForm({ setSubGobjChange, subGobjChange, subGobj, setSubGobj } ) {

//   let bannedArr = [];
//   let tagsArr = [];

//   const [name, setName] = useState('')
//   const [description, setDescription] = useState('')
//   const [numInput1, setNumInput1] = useState(1)
//   const [numInput2, setNumInput2] = useState(1)

//   const { createSG } = useSG()

//   const uname = JSON.parse(localStorage.getItem('theuser'))['user']['uname'];
  
//   const createMSG = async (e) => {
//     e.preventDefault()
//     for (let i = 0; i < numInput1; i++) {
//       tagsArr.push(document.getElementsByClassName('tags-class')[i].value)
//     }
//     for (let i = 0; i < numInput2; i++) {
//       bannedArr.push(document.getElementsByClassName('banned-class')[i].value)
//     }
//     let obj = {
//       uname: uname,
//       name: name,
//       description: description,
//       tags: tagsArr,
//       banned: bannedArr
//     }
//     await createSG(uname, name, description, tagsArr, bannedArr)
//     setSubGobj({ ...subGobj, ...obj })
//     // update the page using useEffect in greddiit.js
//   }
  
//   const addNewField1 = (e) => {
//     e.preventDefault()
//     setNumInput1(numInput1 + 1)
//   }
//   const addNewField2 = (e) => {
//     e.preventDefault()
//     setNumInput2(numInput2 + 1)
//   }

//   return (
//     <div className='myGreddiitForm'>
//       <div className='heading-MSGs'>Create a new Greddiit</div>
//       <form onSubmit={createMSG}>
//         <label className='label-MSGform'>Name</label><br />
//         <input onChange={(e) => setName(e.target.value)} value={name} className='input-MSGform'></input>&nbsp;&nbsp;<br />
//         <br /><br />
//         <label className='label-MSGform'>Desrciption</label><br />
//         <input onChange={(e) => setDescription(e.target.value)} value={description} className='input-MSGform'></input>&nbsp;&nbsp;<br />
//         <br /><br />
//         <label className='label-MSGform'>Tags</label><br />
//         <div className='input-holder1'>
//           {Array(numInput1).fill().map((_, i) => {
//             return (
//               <div key={i}>
//                 <input className='input-MSGform tags-class'></input>
//                 <button className='btn-MSGform btn-MSGform1' onClick={addNewField1}>+</button><br />
//               </div>
//             )
//           }
//           )}
//         </div>
//         <br /><br />
//         <label className='label-MSGform'>Banned Keywords</label><br />
//         <div className='input-holder2'>
//           {Array(numInput2).fill().map((_, i) => {
//             return (
//               <div key={i}>
//                 <input className='input-MSGform banned-class'></input>
//                 <button className='btn-MSGform btn-MSGform2' onClick={addNewField2}>+</button><br />
//               </div>
//             )
//           }
//           )}
//         </div>
//         <button className='submit-MSGform' type='submit'>Submit</button>
//       </form>
//     </div>
//   )
// }
