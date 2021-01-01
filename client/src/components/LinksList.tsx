import React from "react";
import { Link } from "react-router-dom";
import { CustomLink } from "../types";

const LinksList: React.FC<{ links: CustomLink[] }> = ({ links }) => {
  if (!links.length) {
    return <p className="center">Empty list ¯\_(ツ)_/¯</p>;
  }

  return (
    <table className="highlight">
      <thead>
        <tr>
          <th>#</th>
          <th>Original link</th>
          <th>Cut link</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Open</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(LinksList);
