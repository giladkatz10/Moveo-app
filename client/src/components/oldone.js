// import HighlightBlock from './highlightBlock';
// // useEffect hook - run everytime any event is thrown to us from the server
// import React, { useEffect, useState } from 'react';
// // import io from 'socket.io-client';
// import { useParams, useNavigate } from 'react-router-dom';
// import { socket } from '../socket';
// import axios from 'axios';
// import URL from "../socket";
// import { io } from 'socket.io-client';



// function CodeBlockPage( ) {
//   const [codeBlock, setCodeBlock] = useState({
//     name: '',
//     code: '',
//     numOfClients: 0,
//   });
//   const [readOnly, setReadOnly] = useState(false); // TODO: Change it
//   const nevigate = useNavigate(); // Access the history object
//   const {id} = useParams();
//   console.log("codeblock id: ", id)

//   // executed on initialization (once)
//   useEffect(() => {
//     // get codeBlock data
//     axios.get(`${URL}/getcodeblockbyid/:${id}`).then((response) => {
//         if (response.status === 200) {
//           setCodeBlock(response.data);
//           console.log("response.data: ", response.data)
//           console.log(`Read from the Code!! codeBlock: ${codeBlock.code}`)
//         }
//       }).catch((error) => {
//         console.log(`Error occurred while obtaining the codeBloc ${id} in CodeBlock.js: `, error)
//     });
//     // now we should read from the db and update the codeBlock
//     const socket2 = io(`${URL}`)
    
//     // Clean up the event listener when the component unmounts
//     return () => {
//         console.log("quit")
//         socket.off('updateCode');
//     };

//   }, []);

//   const updateCodeBlockCode = (newCode) => {
//     setCodeBlock((prevCodeBlock) => ({
//         ...prevCodeBlock,
//         code: newCode,
//     }));
//     };

//     // useEffect(() => {

//     // })

// //   const handleClientJoin = () => {
// //     setCodeBlock((prevCodeBlock) => ({
// //       ...prevCodeBlock,
// //       numOfClients: prevCodeBlock.numOfClients + 1,
// //     }));
// //     console.log("handleClientJoin", codeBlock.numOfClients)
// //   };

// // const handleClientLeave = () => {
// //     setCodeBlock((prevCodeBlock) => ({
// //       ...prevCodeBlock,
// //       numOfClients: prevCodeBlock.numOfClients - 1,
// //     }));
// //     console.log("handleClientLeave", codeBlock.numOfClients)
// //   };

// // // Subscribe to the "client-join" and "client-leave" events from the server
// // socket.on('client-join', handleClientJoin);
// // socket.on('client-leave', handleClientLeave);

// // // Clean up the event listeners when the component unmounts
// // return () => {
// //   socket.off('client-join', handleClientJoin);
// //   socket.off('client-leave', handleClientLeave);
// // };

// //   const socket = io(`http://localhost:${server_port}`);


// //   useEffect(() => {
// //     const blockId = match.params.id;

// //     // Emit an event to the server indicating that a user has entered the code block page
// //     socket.emit('enterCodeBlock', blockId);

// //     // Listen for code changes from the server
// //     socket.on('codeChange', (newCode) => {
// //       setCode(newCode);
// //     });

// //     // Clean up the socket connection when the component unmounts
// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, [socket, match.params.id]);

//   useEffect(() => {
//     // Listen for the 'code-update' event from the server - wait state
//     socket.on('updateCode', ({ code }) => {
//         updateCodeBlockCode(code);
//     });
  

//   }, );

//   const handleCodeChange = (event) => {
//     const newCode = event.target.value;
//     updateCodeBlockCode(newCode);

//     // update db table
//     axios.put(`${URL}/updatecodeblock/code/:${id}`, { code: newCode, id: id }).then(
//       (response) => {
//         console.log("update response: ", response.data);
//       });

//     // Emit the code changes to the server
//     socket.emit('updateCode', {code: newCode} );
//   };

//   const handleGoBack = () => {
//     nevigate("/");
//   };

//   const saveCodeToDB = () => {
    
//   };

//   return (
//     <div>
//         <div>
//             <h2>Code Block Details</h2>
//             {/* <h3>${match.params.name}</h3> */}
//             <textarea
//                 value={codeBlock.code}
//                 onChange={handleCodeChange}
//                 readOnly={readOnly}
//                 rows={16}
//                 cols={80}
//             />
//         </div>
//         <div>
//             <HighlightBlock code={codeBlock.code}/>
//         </div>
//         <div className='Client'>
//             {/* info box showing read/write permission - maybe different position  */}
//         </div>
//         <div className='db'>
//             {/* maybe a save button for the db */}
//         </div>
//         <div>
//             <button onClick={saveCodeToDB}>Save Code</button>
//             <button onClick={handleGoBack}>Back to Lobby</button>
//         </div>
//     </div>
//   );
// };

// export default CodeBlockPage;
