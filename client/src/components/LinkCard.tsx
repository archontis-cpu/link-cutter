import React from "react";
import { CustomLink } from "../types";

const LinkCard: React.FC<{ link: CustomLink }> = ({ link }) => {
  return (
    <>
      <h2>Link</h2>
      <p>
        Your link:{" "}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        From:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Clicks: <b>{link.clicks}</b>
      </p>
      <p>
        Created: <b>{new Date(link.date).toLocaleDateString()}</b>
      </p>
    </>
  );
};

export default LinkCard;
