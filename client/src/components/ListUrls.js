import React, { Fragment, useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "lightsteelblue",
    color: "steelblue",
    fontWeight: "bold",
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <Fragment>
      <table className="table table-striped table-responsive py-3">
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
                  <IconButton color="secondary" aria-label="copy to clipboard">
                    <ContentCopyRoundedIcon />
                  </IconButton>
                </CopyToClipboard>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Original URL</StyledTableCell>
              <StyledTableCell>Short URL</StyledTableCell>
              <StyledTableCell align="right">Copy</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <StyledTableRow key={url.url_id}>
                <StyledTableCell component="th" scope="row">
                  {url.longurl}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {url.shorturl}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <CopyToClipboard text={url.shorturl}>
                    <IconButton
                      color="secondary"
                      aria-label="copy to clipboard"
                    >
                      <ContentCopyRoundedIcon />
                    </IconButton>
                  </CopyToClipboard>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default ListUrls;
