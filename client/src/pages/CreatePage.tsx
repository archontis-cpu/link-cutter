import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/Input";
import { AuthContext } from "../context/AuthContext";
import {
  httpMethod,
  requestHeaders,
  requestPayload,
  serverResponse,
  useHTTP,
} from "../hooks/useHTTP";

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const { request } = useHTTP();
  const [link, setLink] = useState("");

  const changeHandler: React.ChangeEventHandler<any> = (event) => {
    setLink(event.target.value);
  };

  const pressHandler: React.KeyboardEventHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request<
          string,
          httpMethod,
          requestPayload,
          requestHeaders,
          serverResponse
        >("/api/link/generate", "POST", JSON.stringify({ from: link }), {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        });
        const path = "/detail/" + data.link._id;
        history.push(path);
      } catch (error) {}
    }
  };

  useEffect(() => {
    window?.M?.updateTextFields();
  });

  return (
    <div style={{ paddingTop: "2rem" }}>
      <div
        className="col s8 offset-s2 blue darken-1"
        style={{ padding: "2rem" }}
      >
        <Input
          label="Insert a link"
          htmlFor="link"
          type="text"
          name="Link"
          id="link"
          value={link}
          onChangeHandler={changeHandler}
          keyPressHandler={pressHandler}
        />
      </div>
    </div>
  );
};

export default React.memo(CreatePage);
