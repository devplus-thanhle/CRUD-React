import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getNotes } from "../redux/Action/studentAction";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Box, Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getDataAPI } from "../api/fetchData";
import { GLOBALTYPES } from "../redux/Action/globalTypes";
import SearchForm from "../components/SearchForm";

const columns = [
  { id: "stt", label: "STT", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 170,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
  },
  {
    id: "hobby",
    label: "Hobby",
    minWidth: 80,
  },
  {
    id: "handle",
    label: "Handle",
    minWidth: 80,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "relative",
  },
  container: {
    maxHeight: 440,
    borderRadius: "5px",
  },
  btnCreate: {
    marginTop: 20,
    marginBottom: 20,
  },
  link: {
    textDecoration: "none",
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-25%, -50%)",
  },
}));

function Home(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);
  const { student } = useSelector((state) => state);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (student.students) {
      setData(student.students);
    }
  }, [student]);
  const [filter, setFilter] = useState();

  useEffect(() => {
    async function Search() {
      if (filter) {
        console.log(filter.value);
        setLoading(true);
        await getDataAPI(`search?fullname=${filter.value}`)
          .then((res) => setData(res.data.students))
          .catch((err) => {
            dispatch({
              type: GLOBALTYPES.ALERT,
              payload: {
                err: err.response.data.msg,
              },
            });
          });
        setLoading(false);
      }
    }
    Search();
  }, [filter, dispatch]);

  const handleRemove = (id) => {
    if (window.confirm("Are you sure to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleFiterChange = (newFilter) => {
    setFilter(newFilter);
  };
  const handleClose = (data) => {
    setFilter(data);
  };

  return (
    <>
      <SearchForm onSubmit={handleFiterChange} handleClose={handleClose} />
      {student.loading ? (
        <div className={classes.loading}>
          <CircularProgress size={70} />
        </div>
      ) : (
        <>
          <Typography
            variant="h6"
            style={{ padding: "30px 0", color: "#466360" }}
          >
            /List Students
          </Typography>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          backgroundColor: "#5C8D89",
                          color: "white",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {!loading ? (
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => {
                        return (
                          <TableRow hover key={item._id}>
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell align="left">{item.fullname}</TableCell>
                            <TableCell align="left">{item.email}</TableCell>
                            <TableCell align="left">{item.mobile}</TableCell>
                            <TableCell align="left">{item.address}</TableCell>
                            <TableCell align="left">{item.hobby}</TableCell>
                            <TableCell align="left">
                              <Link
                                to={`edit/${item._id}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Button
                                  style={{ marginRight: "10px" }}
                                  variant="outlined"
                                  color="primary"
                                >
                                  Edit
                                </Button>
                              </Link>

                              <Button
                                onClick={() => handleRemove(item._id)}
                                variant="outlined"
                                color="secondary"
                              >
                                remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                ) : (
                  <Box
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translate(-50%,0)",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}
    </>
  );
}

export default Home;
