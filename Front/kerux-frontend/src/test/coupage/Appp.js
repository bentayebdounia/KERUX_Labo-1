import React, { useState } from "react";

const  Appp = () => {
    const [rows, setRows] = useState([
        { id: 1, content: 'row 1' },
        { id: 2, content: 'row 2' },
        { id: 3, content: 'row 3' },
      ]);
    
      const handleDeleteRow = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      };
    
      return (
        <table>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.content}</td>
                <td>
                  <button onClick={() => handleDeleteRow(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default Appp;