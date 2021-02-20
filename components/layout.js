import { Container, makeStyles } from "@material-ui/core";
import Navbar from "components/navbar";

const useStyles = makeStyles({
  root: {
    paddingTop: 50,
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container className={classes.root}>{children}</Container>
    </>
  );
};

export default Layout;
