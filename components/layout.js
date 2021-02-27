import { Container, makeStyles } from "@material-ui/core";
import Navbar from "components/navbar";
import Disclaimer from "./disclaimer";

const useStyles = makeStyles({
  root: {
    marginTop: 25,
    marginBottom: 50,
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container className={classes.root}>{children}</Container>
      <Disclaimer />
    </>
  );
};

export default Layout;
