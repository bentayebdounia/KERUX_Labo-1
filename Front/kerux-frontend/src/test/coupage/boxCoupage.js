import { useState } from "react";

export default function BoxCoupage(props) {
  //console.log(props.id_box);
  const [sup, setSup] = useState(false);

  return (
    <>
      <input
        type="text"
        className="form-control mb-1"
        aria-describedby="button-addon2"
        value={props.id_box}
        onChange={(event) => {
          props.onIdChange(event.target.value);
        }}
        placeholder="ID box"
      />
      {props.k < 0 && (
        <>
          <div style={{ background: "white" }}>
            <i
              className="bi bi-trash-fill"
              style={{ color: "#7B170F", fontSize: "15px" }}
              onClick={() => {
                props.supprimerBox(props.k - 1);
              }}
            ></i>
            <label
              type="text"
              style={{ color: "#000", fontSize: "14px " }}
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            >
              {props.id_box}{" "}
            </label>
          </div>
        </>
      )}
    </>
  );
}
