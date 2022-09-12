import React, { Fragment, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import IconButton from "@mui/material/IconButton";

const ListUrls = () => {
  const [urls, setUrls] = useState([]);

  const getUrls = async () => {
    try {
      const response = await fetch("/api/urls");
      const jsonData = await response.json();

      setUrls(jsonData);
    } catch (err) {
      console.error(err.message);
      toast.error("Unable to lists URL", {
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
      <table className="table table-striped table-responsive py-3 text-center">
        <thead className="text-left">
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Copy</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {urls.map((url) => (
            <tr key={url.url_id}>
              <td>{url.longurl}</td>
              <td>{url.shorturl}</td>
              <td>
                <CopyToClipboard
                  text={url.shorturl}
                >
                  <IconButton color="secondary" aria-label="copy to clipboard">
                    <ContentCopyRoundedIcon />
                  </IconButton>
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
