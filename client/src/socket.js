import { io } from 'socket.io-client';


// let server_port = process.env.PORT;
let URL = "https://moveo-app-server-heroku-c7ed3e904d51.herokuapp.com";
// if (server_port == null || server_port === "") {
//     server_port = 3001;
//     URL = `http://localhost:${server_port}`;
// };

export const socket = io(URL);
export default URL;