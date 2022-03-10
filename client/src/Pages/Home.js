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
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    transform: "translate(-50%, -50%)",
  },
}));

function Home(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
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

  const handleRemove = (id) => {
    if (window.confirm("Are you sure to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <>
      {student.loading ? (
        <div className={classes.loading}>
          <CircularProgress size={70} />
        </div>
      ) : (
        <>
          <Typography variant="h4">List Students</Typography>
          <Link className={classes.link} to="/create">
            <Button
              className={classes.btnCreate}
              variant="contained"
              color="primary"
            >
              Create Student
            </Button>
          </Link>
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
                          minWidth: column.minWidth,
                          backgroundColor: "#5C8D89",
                          color: "white",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => {
                      return (
                        <TableRow hover key={item._id}>
                          <TableCell
                            component="th"
                            style={{ width: 50 }}
                            scope="row"
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            {item.fullname}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            {item.email}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            {item.mobile}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            {item.address}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            {item.hobby}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="left">
                            <Link to={`edit/${item._id}`}>
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
