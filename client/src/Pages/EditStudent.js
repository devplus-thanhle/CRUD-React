import {
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
import { useHistory, useParams } from "react-router-dom";
import { getNotes, updateStudent } from "../redux/Action/studentAction";

const useStyles = makeStyles((theme) => ({
  textfield: {
    marginBottom: theme.spacing(1),
  },
}));

function EditStudent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const initialState = {
    fullname: "",
    email: "",
    mobile: "",
    address: "",
    hobby: "",
  };

  const [studentData, setStudentData] = useState(initialState);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const { student } = useSelector((state) => state);
  useEffect(() => {
    const res = student.students.find((item) => item._id === id);
    setStudentData(res);
  }, [student, id]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudent(studentData, id));
    history.push("/");
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h3">Update Student</Typography>
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
              value={studentData ? studentData.fullname : "..."}
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
            value={studentData ? studentData.email : "..."}
            onChange={handleInput}
          />
          <TextField
            className={classes.textfield}
            label="Phone"
            name="mobile"
            fullWidth
            variant="outlined"
            value={studentData ? studentData.mobile : "..."}
            onChange={handleInput}
          />
          <TextField
            className={classes.textfield}
            label="Address"
            name="address"
            fullWidth
            variant="outlined"
            value={studentData ? studentData.address : "..."}
            onChange={handleInput}
          />
          <TextField
            className={classes.textfield}
            label="Hobby"
            name="hobby"
            fullWidth
            variant="outlined"
            value={studentData ? studentData.hobby : "..."}
            onChange={handleInput}
          />

          <Button
            disabled={student.loading}
            color="primary"
            mg={1}
            type="submit"
            fullWidth
            variant="contained"
          >
            Lưu thay đổi
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default EditStudent;
