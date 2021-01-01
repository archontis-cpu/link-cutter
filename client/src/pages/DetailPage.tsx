import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkCard from "../components/LinkCard";
import Loader from "../components/Loader";
import { CustomLink } from "../types";
import { AuthContext } from "../context/AuthContext";
import {
  useHTTP,
  httpMethod,
  requestHeaders,
  requestPayload,
  serverResponse,
} from "../hooks/useHTTP";

const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHTTP();
  const [link, setLink] = useState({} as CustomLink);
  const linkId = useParams<{ id: string }>().id;

  useEffect(() => {
    (async () => {
      try {
        const fetchedLink = await request<
          string,
          httpMethod,
          requestPayload,
          requestHeaders,
          serverResponse
        >(`/api/link/${linkId}`, "GET", null, {
          Authorization: `Bearer ${token}`,
        });

        setLink(fetchedLink);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [token, linkId, request]);

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {!loading && link && <LinkCard link={link} />}
    </React.Fragment>
  );
};

export default DetailPage;
