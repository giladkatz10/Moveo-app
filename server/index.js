const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mysql = require('mysql2');
const { error } = require("console");

// set up a db connection
const db = mysql.createConnection({
    host: 'containers-us-west-142.railway.app',
    user: 'root',
    password: 'MJTzi7EObrcCOEWtlo3H',
    port: '5895',
    database: 'railway',
    protocol: 'tcp'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
let server_port = process.env.PORT;
if (server_port == null || server_port == "") {
    server_port = 3001;
};

const io = new Server(server, {
  cors: { origin: `*`,},
});

// listen to events - socket.io
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Client joins to a specific blockCode
  socket.on("join_block", async ({block_id}) => {
    socket.join(block_id);
    try {
      const result = await get_code_block_details(block_id);
      socket.emit("code_block_data", { data: result });
    } catch (err) {
      console.error("Error occurred while fetching code block:", err);
    }
  });

  socket.on("get_block_data_on_exit", async ({block_id}) => {
    try {
        const result = await get_code_block_details(block_id);
        socket.emit("code_block_data_on_exit", { data: result });
      } catch (err) {
        console.error("Error occurred while fetching code block:", err);
      }
  });
  
  // 
  socket.on('sended_update_code', ({ code, block_id }) => {
    // Broadcast the code to client in a specific code block
    socket.to(block_id).emit("received_update_code", {code: code});
    // Update DB 
    update_code_block_code(block_id, code);
  });

  socket.on("update_num_of_clients", async ({block_id, numOfClients}) => {
    // console.log("blockid numOfClients::", block_id, numOfClients)
    update_code_block_clients(block_id, numOfClients);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`)

  });
});

// Get codeBloc data by id
async function get_code_block_details(block_id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM CodeBlocks WHERE id = ?;';
      db.query(query, [block_id], (err, result) => {
        if (err) {
          console.error('Error occurred while fetching code block, index.js:', err);
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  };


function update_code_block_code(block_id, code){
    const query = 'UPDATE CodeBlocks SET code = ? WHERE id = ?;';
    db.query(query, [code, block_id], (err, result) => {
        if (err) {
            console.error("Error occurred while updating codeBlock's code by ID, index.js:", err);
         } else {
            // all good
            }
        });
  }

  // update the number of clients in the blockCode 
function update_code_block_clients(block_id, num_of_clients){
    const query = 'UPDATE CodeBlocks SET numOfClients = ? WHERE id = ?;';
    db.query(query, [num_of_clients, block_id], (err, result) => {
        if (err) {
            console.error("Error occurred while updating codeBlock's code by ID, index.js:", err);
         } else {
            console.log(`Update clients of code block id ${block_id} to: ${num_of_clients}`);
            }
        });
  };


// API
app.get("/", (req, res) => {
    const str = "Moveo-app,  port:" + server_port
    res.json(str);
});

app.get("/getcodeblocks", (req, res) => {
    const query = 'SELECT * FROM CodeBlocks';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error occurred while fetching code blocks, index.js:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
});

app.put("/resetclients", (req, res) => {
    const query = 'UPDATE CodeBlocks SET numOfClients = 0 WHERE id = ?;';
    for (let i = 1; i < 5; i ++){
        db.query(query, [i], (err, result) => {
            if (err) {
                console.error("Error occurred while reset DB, index.js:", err);
                res.status(500).json({ error: 'Internal server error' });
                } else if (result.length === 0) {
                res.status(404).json({ error: 'Code block not found' });
                } else {
                    // reset DB successfully
                }
            });
        };
    });
    

server.listen(server_port, () => { 
  console.log(`SERVER IS RUNNING ON PORT: ${server_port}`); // back 3001
});
