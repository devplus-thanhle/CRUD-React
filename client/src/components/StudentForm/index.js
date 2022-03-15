import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import IconForm from "../../assets/img/iconform.png";

const useStyles = makeStyles((theme) => ({
  textfield: {
    paddingBottom: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
  },
  img: {
    width: "10%",
    display: "flex",
    margin: "0 auto",
  },
  title: {
    padding: "10px 0 20px 0",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: "19px",
    fontWeight: 500,
  },
}));

const StudentForm = (props) => {
  const { onSubmit, initialValues } = props;
  const classes = useStyles();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    fullname: yup.string().required("Please enter your fullname!"),
    email: yup
      .string()
      .required("Please enter your email!")
      .email("Please enter a valid email!"),
    mobile: yup
      .string()
      .required("Please enter your mobile!")
      .matches(phoneRegExp, "Phone number is not valid"),
    address: yup.string().required("Please enter your address!"),
    hobby: yup.string().required("Please enter your hobby!"),
  });
  // const { alert } = useSelector((state) => state);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      if (onSubmit) {
        await onSubmit(values);
      }
    },
  });

  return (
    <div>
      <Typography variant="h6" style={{ color: "#466360" }}>
        {`/${props.children}`}
      </Typography>
      <Container maxWidth="sm">
        <img src={IconForm} alt="icon" className={classes.img} />
        <Typography variant="h7" className={classes.title}>
          {props.children}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.textfield}
            fullWidth
            variant="outlined"
            id="fullname"
            name="fullname"
            label="Fullname"
            value={formik.values.fullname && formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            helperText={formik.touched.fullname && formik.errors.fullname}
          />
          <TextField
            fullWidth
            className={classes.textfield}
            variant="outlined"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            className={classes.textfield}
            variant="outlined"
            id="mobile"
            name="mobile"
            label="Mobile"
            type="text"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
          <TextField
            fullWidth
            className={classes.textfield}
            variant="outlined"
            id="address"
            name="address"
            label="Address"
            type="text"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            fullWidth
            className={classes.textfield}
            variant="outlined"
            id="hobby"
            name="hobby"
            label="Hobby"
            type="text"
            value={formik.values.hobby}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.hobby && Boolean(formik.errors.hobby)}
            helperText={formik.touched.hobby && formik.errors.hobby}
          />
          <Button
            // disabled={!formik.isSubmitting}
            // style={{ backgroundColor: "#5C8D89", color: "white" }}
            color="primary"
            type="submit"
            fullWidth
            variant="contained"
            className={classes.btnSubmit}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default StudentForm;
