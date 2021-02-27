import { Box, Typography } from "@material-ui/core";

const Disclaimer = () => {
  return (
    <Box position="fixed" bottom="0" right="0" margin=".125em">
      <Typography variant="overline" component="span">
        <small>
          <b>Disclaimer: </b>This website is for educational purposes only and
          data shown may be inaccurate
        </small>
      </Typography>
    </Box>
  );
};

export default Disclaimer;
