import React, { Fragment, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const ListUrls = () => {
  const [urls, setUrls] = useState([]);
  const [copied, setCopied] = useState(false);

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
      toast.error("Unable to submit URL", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
    }
  };

  return (
    <Fragment>
      <table className="table table-striped table-responsive my-5 text-left">
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Copy</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.url_id}>
              <td>{url.longurl}</td>
              <td>{url.shorturl}</td>
              <td>
                <CopyToClipboard
                  text={url.shorturl}
                  onCopy={() => setCopied(true)}
                >
                  <button type="button" className="btn btn-info btn-sm">
                    Copy
                  </button>
                </CopyToClipboard>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListUrls;
