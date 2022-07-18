import React, {useState, useEffect} from "react";
import Board from "react-trello";
import config from "config";
import {Card} from "hydrogen";

const Kanban = (props) => {
  const {
    data,
  } = props;

  return (
    <Card className="">
      <Board 
        data={{
          lanes: [

          ]
        }}
        style={{
          backgroundColor: ""
        }}
      />
    </Card>
  )
}

export default Kanban;