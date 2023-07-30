import HighlightBlock from './highlightBlock';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import URL from "../socket";
import { io } from 'socket.io-client';
import { Button, Card, Container, Row, Col, Badge } from 'react-bootstrap';


function CodeBlockPage( ) {
    const [socket, setSocket] = useState(null);
    const {id} = useParams();
    const [codeBlock, setCodeBlock] = useState({
    name: '',
    code: '',
    numOfClients: 0,
    });
    const [isMentor, setIsMentor] = useState(false);
    const nevigate = useNavigate(); 

    // handle connectivity and fetching code Block data on initialization
    useEffect(() => {
        // Connect to the Socket.io server
        const socket = io.connect(`${URL}`);
        setSocket(socket); 

        // get codeBlock data
        socket.emit("join_block",{block_id: id});

        socket.on("code_block_data",async ({data} )=> {
            setCodeBlock(data);
            setIsMentor(data.numOfClients === 0);
            socket.emit("update_num_of_clients", {block_id: id, numOfClients: data.numOfClients + 1})
            updateNumOfClients(data.numOfClients + 1)
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // handle update code 
    useEffect(() => {
        if (socket == null) return;
        // update code received from server
        socket.on('received_update_code', ({code}) => {
            updateCodeBlockCode(code);
        });
        return () => {
            socket.off("received_update_code");
        };
      }, [socket]);

      // handle client exit to lobby
      useEffect(() => {
        if (socket == null) return;
    
        socket.on("code_block_data_on_exit", async ({ data }) => {
            socket.emit("update_num_of_clients", { block_id: id, numOfClients: data.numOfClients - 1 });
            nevigate("/");
        });
    
        return () => {
          socket.off("code_block_data_on_exit"); 
        };
      }, [socket]);


    const updateCodeBlockCode = (newCode) => {
        setCodeBlock((prevCodeBlock) => ({
            ...prevCodeBlock,
            code: newCode,
        }));
        };
    
    const updateNumOfClients = (newNumOfClient) => {
        setCodeBlock((prevCodeBlock) => ({
            ...prevCodeBlock,
            numOfClients: newNumOfClient,
        }));
        };


  const handleCodeChange = (event) => {
    // Send new 
    const newCode = event.target.value;
    updateCodeBlockCode(newCode);

    // Emit the code changes to the server
    socket.emit('sended_update_code', {code: newCode, block_id: id});
  };

  const handleGoBack = () => {
    socket.emit("get_block_data_on_exit", {block_id: id});
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Body>
                <h3 className="text-uppercase">{codeBlock.name}</h3>
              <Card.Text>
                {isMentor ? (
                  <Badge variant="success">Mentor Mode - Read Only</Badge>
                ) : (
                  <Badge variant="primary">Student Mode</Badge>
                )}
              </Card.Text>
              <Card.Text>
                Client number: {codeBlock.numOfClients}
              </Card.Text>
              {/* Conditionally render the textarea */}
              {!isMentor && (
                <textarea
                  value={codeBlock.code}
                  onChange={handleCodeChange}
                  className="form-control"
                  rows={10}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h3>Code Preview</h3>
          <div >
            <HighlightBlock code={codeBlock.code} />
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleGoBack}>
            Back to Lobby
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeBlockPage;
