import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import URL from "../socket";
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const LobbyPage = () => {

  const [codeBlocks, setCodeBlocks] = useState([])

  // read blocks from data on initialization 
  useEffect(() => {
    axios.get(`${URL}/getcodeblocks`).then((response) => {
        setCodeBlocks(response.data);
    }).catch((error) => {console.log("Error occurred while obtaining codeBlocs in Lobby.js: ", error)});
  }, [codeBlocks]);
  
  const resetDB = () => {
    axios.put(`${URL}/resetclients`).then((response) => {
    }).catch((error) => {console.log("Error occurred while resetDB - Lobby.js: ", error)});
  };


  return (
    <div className="background">
        <div className="container mt-5 lobby-container">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <h1 className="text-center ">The Code Block Lobby</h1>
                    <h3 className="text-center">Please select one of the options below</h3>
                    <ListGroup>
                        {codeBlocks.map(({ id, name }) => (
                            <ListGroup.Item variant="primary" key={id}>
                                <Link to={`/code-block/${id}`}>{name}</Link>
                            </ListGroup.Item>
                            ))}
                    </ListGroup>
                </div>
            </div>
        <div className="row mt-4">
            <div className="col-md-4 mx-auto">
                <button className="btn btn-danger btn-block" onClick={resetDB}>
                    Reset Clients
                </button>
            </div>
        </div>
        </div>
    </div>
  );
};

export default LobbyPage;
