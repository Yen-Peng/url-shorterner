import React, { Fragment, useEffect, useState } from "react";

const ListUrls = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    getUrls();
  }, []);

  const getUrls = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/urls");
      const jsonData = await response.json();

      setUrls(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteUrl = async id => {
    try {
      const deleteUrl = await fetch(`http://api/urls/${id}`, {
        method: "DELETE",
      });
      setUrls(urls.filter(url => url.url_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <table className="table table-striped table-responsive mt-5 text-left">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(url => (
            <tr key={url.url_id}>
              <td>{url.longurl}</td>
              <td>{url.shorturl}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUrl(url.url_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListUrls;
