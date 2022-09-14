import React, { Fragment, useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import IconButton from "@mui/material/IconButton";

const ListUrls = () => {
  const [urls, setUrls] = useState([]);

  const getUrls = async () => {
    try {
      const response = await fetch("/api/urls");
      const urlArray = await response.json();

      setUrls(urlArray);
    } catch (err) {
      console.error(err.message);
      toast.error("Unable to list URL", {
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

  const deleteUrls = async () => {
    console.log("delete");
    try {
      const deleteUrls = await fetch(`/api/urls`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="col-auto">
        <table className="table table-striped table-responsive py-3 text-left">
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
                  <CopyToClipboard text={url.shorturl}>
                    <IconButton
                      color="secondary"
                      aria-label="copy to clipboard"
                    >
                      <ContentCopyRoundedIcon />
                    </IconButton>
                  </CopyToClipboard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {urls.length > 0 && (
          <div className="row justify-content-center">
            <button className="btn btn-sm btn-grad" onClick={deleteUrls}>
              Clear Table
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListUrls;
