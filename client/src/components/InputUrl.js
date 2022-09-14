import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const InputUrl = () => {
  const [longurl, setLongurl] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (longurl.startsWith(window.location.origin)) {
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
        const response = await fetch("/api/shorten", {
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
      <h1 className="title text-center pt-5">
        <b className="bold-title">Weely</b>
        <h4 className="mt-2">shortens your URL</h4>
      </h1>
      <form className="py-5" onSubmit={onSubmitForm}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <label htmlFor="fullUrl" className="sr-only">
                Url
              </label>
              <input
                required
                type="text"
                name="fullUrl"
                placeholder="Paste your URL here"
                className="form-control mb-2 mr-2 col"
                value={longurl}
                onChange={(e) => setLongurl(e.target.value)}
              />
            </div>
            <div className="col-sm-2">
              <div className="row justify-content-center">
                <button className="btn btn-sm btn-grad">Shorten</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default InputUrl;
