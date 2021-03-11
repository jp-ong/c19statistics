import { Box, Button, Tooltip } from "@material-ui/core";
import {
  NavigateNextRounded as NextIcon,
  NavigateBeforeRounded as PrevIcon,
} from "@material-ui/icons";
import Link from "next/link";

const CountryPagination = ({ prevCountry, nextCountry, country }) => {
  const endPrev = prevCountry === -1;
  const endNext = nextCountry === -1;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      marginTop="2em"
      marginBottom="1em"
      flexWrap="wrap"
    >
      <Tooltip title={`See ${endPrev ? country : prevCountry} Overview`}>
        <Link href={`/${endPrev ? country : prevCountry}`} passHref>
          <Button
            disabled={endPrev}
            variant="outlined"
            startIcon={<PrevIcon />}
          >
            {endPrev ? country : prevCountry}
          </Button>
        </Link>
      </Tooltip>
      <Tooltip title={`See ${endNext ? country : nextCountry} Overview`}>
        <Link href={`/${endNext ? country : nextCountry}`} passHref>
          <Button disabled={endNext} variant="outlined" endIcon={<NextIcon />}>
            {endNext ? country : nextCountry}
          </Button>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default CountryPagination;
