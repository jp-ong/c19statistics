import { Box, Typography } from "@material-ui/core";

const Disclaimer = () => {
  return (
    <Box textAlign="left" marginTop="10em" marginX="1em">
      <Typography variant="overline" component="p">
        <small>
          <b>Disclaimer: </b>This website is for educational purposes only and
          data shown may be inaccurate
        </small>
      </Typography>
    </Box>
  );
};

export default Disclaimer;
