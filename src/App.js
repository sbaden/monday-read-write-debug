import React, { useState, useEffect } from 'react';
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"

const monday = mondaySdk();
// monday.setToken(process.env.REACT_APP_MONDAY_ACCESS_TOKEN);
monday.setToken(ADD_TOKEN_HERE);

const App = (props) => {
  const [name] = useState('Monday');
  const [greeting] = useState(`Hello ${name}!`);
  const [myBoardId] = useState(1253326269);


  useEffect(() => {

    const variables = ({
      boardId : myBoardId,
      groupId: "new_group",
      itemName : "Dynamic item creation",
      columnValues: JSON.stringify({
        person: 
          {
            id: 20602378,
          }
        ,
        text0: "Marvin the Martian",
        dropdown: [2],
      })
    })

    const query = `mutation create_item ($boardId: Int!, $itemName: String!, $columnValues: JSON!) { 
      create_item (
        board_id: $boardId,
        group_id: $groupId,
        item_name: $itemName, 
        column_values: $columnValues
      ) 
      { id } 
    }`;

    const response = monday.api(query,{variables}).then((res) => {
      let data = res;
        console.log('new item info: ', typeof data);
    });

    console.log("response: ", response)
  
  },[myBoardId]);

  
  return <div className="App">
    <AttentionBox
      title={greeting}
      text={myBoardId + ' BoardId'}
      // text="{data + ' boards'}"
      type="success"
    />
  </div>;
}

export default App;