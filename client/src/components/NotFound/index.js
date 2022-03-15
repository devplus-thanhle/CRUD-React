import { makeStyles } from "@material-ui/core";
import React from "react";
import ImgNotFound from "../../assets/img/404.png";
const useStyles = makeStyles((theme) => ({
  img: {
    backgroundImage: "url(" + ImgNotFound + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
}));

function NotFound(props) {
  const classes = useStyles();
  return (
    <div
      className={classes.img}
      style={{ width: "100%", height: "calc(100vh - 150px)" }}
    >
      {/* <img
        style={{ width: "100%", height: "100%", backgroundSize: "cover" }}
        src={ImgNotFound}
        alt="404"
      /> */}
    </div>
  );
}

export default NotFound;
