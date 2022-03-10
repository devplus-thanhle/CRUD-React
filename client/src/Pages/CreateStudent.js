import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createStudent } from "../redux/Action/studentAction";

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginBottom: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
  },
  btnBox: {
    display: "flex",
  },
  btnSubmit: {
    width: "70%",
    marginRight: 10,
  },
  btnGoBack: {
    width: "30%",
  },
}));

function CreateStudent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state);
  const history = useHistory();
  const initialState = {
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    hobby: "",
  };

  const [studentData, setStudentData] = useState(initialState);
  const { fullname, email, mobile, address, hobby } = studentData;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createStudent(studentData));
  };

  useEffect(() => {
    if (alert.success) {
      setStudentData(initialState);
    }
  }, [alert.success, initialState]);
  const handleGoBack = () => {
    history.push("/");
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h3">Create Student</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            style={{ marginTop: "30px", marginBottom: 0 }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Fullname
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              className={classes.textfield}
              label="Fullname"
              name="fullname"
              fullWidth
              variant="outlined"
              value={fullname}
              onChange={handleInput}
              // endAdornment={
              //   <InputAdornment className={classes.text} position="end">
              //     {fullname.length}/25
              //   </InputAdornment>
              // }
            />
          </FormControl>

          <TextField
            className={classes.textfield}
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={handleInput}
          />
          <TextField
            className={classes.textfield}
            label="Phone"
            name="mobile"
            fullWidth
            variant="outlined"
            value={mobile}
            onChange={handleInput}
          />
          <TextField
            className={classes.textfield}
            label="Address"
            name="address"
            fullWidth
            variant="outlined"
            value={address}
            onChange={handleInput}
          />
          <TextField
            className={classes.textfield}
            label="Hobby"
            name="hobby"
            fullWidth
            variant="outlined"
            value={hobby}
            onChange={handleInput}
          />
          <Box className={classes.btnBox}>
            <Button
              color="primary"
              mg={1}
              type="submit"
              fullWidth
              variant="contained"
              className={classes.btnSubmit}
            >
              Lưu thay đổi
            </Button>
            <Button
              color="primary"
              mg={1}
              variant="contained"
              className={classes.btnGoBack}
              onClick={handleGoBack}
            >
              Go back
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}

export default CreateStudent;
