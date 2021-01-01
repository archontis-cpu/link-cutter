import React, { useContext, useEffect, useState } from "react";
import LinksList from "../components/LinksList";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import {
  useHTTP,
  httpMethod,
  requestHeaders,
  requestPayload,
  serverResponse,
} from "../hooks/useHTTP";

const LinksPage = () => {
  const { token } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const { loading, request } = useHTTP();

  useEffect(() => {
    (async () => {
      try {
        const fetched = await request<
          string,
          httpMethod,
          requestPayload,
          requestHeaders,
          serverResponse
        >("/api/link", "GET", null, {
          Authorization: `Bearer ${token}`,
        });

        setLinks(fetched);
      } catch (error) {
        console.error();
      }
    })();
  }, [request, token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>{!loading && <LinksList links={links} />}</React.Fragment>
  );
};

export default React.memo(LinksPage);
