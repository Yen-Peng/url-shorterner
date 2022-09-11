import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const InputUrl = () => {
  const [longurl, setLongurl] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (longurl.startsWith("http://localhost:5000")) {
      toast.info("URL is already shortened", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
      setLongurl("");
    } else {
      try {
        const body = { longurl };
        const response = await fetch("http://localhost:5000/api/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        window.location = "/";
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
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">
        <b>URL</b> Shortener
      </h1>
      <form className="form-inline mt-5" onSubmit={onSubmitForm}>
        <label htmlFor="fullUrl" className="sr-only">
          Url
        </label>
        <input
          required
          type="text"
          name="fullUrl"
          placeholder="Paste your URL here"
          className="form-control mr-2 col"
          value={longurl}
          onChange={e => setLongurl(e.target.value)}
        />
        <button className="btn btn-success">Shorten</button>
      </form>
    </Fragment>
  );
};

export default InputUrl;
