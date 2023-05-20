// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { useSG } from '../hooks/useSG'
// import '../css/myGreddiits.css'

// let keyVals = 10;

// export default function MyGreddiits({ setSubGobjChange, subGobjChange, subGobj, setSubGobj }) {

//     const { getMyGreddiits } = useSG()

    

//     let numImages = 7;
//     let squareRoot = 0;
//     for (let i = 0; i <= numImages; i++) {
//         if (i * i >= numImages) {
//             squareRoot = i
//             break
//         }
//     }
//     const imgsStyle = {
//         gridTemplateColumns: `repeat(${squareRoot}, 1fr)`
//     }

//     const eachImageStyle = {
//         width: `${900 / squareRoot}px`,
//         height: `${650 / squareRoot}px`,
//         paddingTop: `${50 / squareRoot}px`,
//         fontSize: `${50 / squareRoot}px`
//     }

//     return (
//         <div className='myGreddiits'>
//             <div className='heading-MSGs'>My Sub Greddiits</div>
//             <div className="image2" style={imgsStyle} id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
//                 {subGobj && Object.values(subGobj).map((eachMSG) => {
//                     return (
//                         <div key={keyVals && keyVals++} className="eachMSG" style={eachImageStyle}>
//                             <div key={keyVals && keyVals++} className="justforcentering">
//                                 NAME: {eachMSG["name"]}<br />
//                                 DESCRIPTION: {eachMSG["description"]}<br />
//                                 <div key={keyVals && keyVals++} className='class-of-tags'>
//                                     TAGS {eachMSG["tags"].map((eachTag) => {
//                                         return (
//                                             <div key={keyVals && keyVals++}>{eachTag}</div>
//                                             )
//                                     }
//                                     )}
//                                 </div>
//                                 <div key={keyVals && keyVals++} className='bannedKeywords'>
//                                     BANNED KEYWORDS {eachMSG["bannedKeywords"].map((eachBannedKeyword) => {
//                                         return (
//                                             <div key={keyVals && keyVals++}>{eachBannedKeyword}</div>
//                                             )
//                                     }
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 }
//                 )}
//                 {/* <div className="eachMSG" style={eachImageStyle}>
//                         Name: Akshat<br />
//                         Description: Akshat<br />
//                         Tags: Akshat<br />
//                         Banned Keywords: <div>Akshat</div>
//                 </div>
//                 <div className="eachMSG" style={eachImageStyle}>
//                         Name: Akshat<br />
//                         Description: Akshat<br />
//                         Tags: Akshat<br />
//                         Banned Keywords: <div>Akshat</div>
//                 </div>
//                 <div className="eachMSG" style={eachImageStyle}>
//                         Name: Akshat<br />
//                         Description: Akshat<br />
//                         Tags: Akshat<br />
//                         Banned Keywords: <div>Akshat</div>
//                 </div>
//                 <div className="eachMSG" style={eachImageStyle}>
//                         Name: Akshat<br />
//                         Description: Akshat<br />
//                         Tags: Akshat<br />
//                         Banned Keywords: <div>Akshat</div>
//                 </div>
//                 <div className="eachMSG" style={eachImageStyle}>
//                         Name: Akshat<br />
//                         Description: Akshat<br />
//                         Tags: Akshat<br />
//                         Banned Keywords: <div>Akshat</div>
//                 </div>
//                 <div className="eachMSG" style={eachImageStyle}>
//                         Name: Akshat<br />
//                         Description: Akshat<br />
//                         Tags: Akshat<br />
//                         Banned Keywords: <div>Akshat</div>
//                 </div>
//                 <div className="eachMSG" style={eachImageStyle}>
//                         Name: Akshat<br />
//                         Description: Akshat<br />
//                         Tags: Akshat<br />
//                         Banned Keywords: <div>Akshat</div>
//                 </div> */}
//             </div>
//         </div>
//     )
// }
