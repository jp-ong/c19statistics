import { Box, Button, Tooltip } from "@material-ui/core";
import { useRouter } from "next/router";
import {
  NavigateNextRounded as NextIcon,
  NavigateBeforeRounded as PrevIcon,
} from "@material-ui/icons";

const CountryPagination = ({ prevCountry, nextCountry, country }) => {
  const router = useRouter();
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
        <Button
          disabled={endPrev}
          variant="outlined"
          onClick={() => router.push(`/${prevCountry}`)}
          onMouseOver={() => router.prefetch(`/${prevCountry}`)}
          color="secondary.dark"
          startIcon={<PrevIcon />}
        >
          {endPrev ? country : prevCountry}
        </Button>
      </Tooltip>
      <Tooltip title={`See ${endNext ? country : nextCountry} Overview`}>
        <Button
          disabled={endNext}
          variant="outlined"
          onClick={() => router.push(`/${nextCountry}`)}
          onMouseOver={() => router.prefetch(`/${nextCountry}`)}
          color="secondary.dark"
          endIcon={<NextIcon />}
        >
          {endNext ? country : nextCountry}
        </Button>
      </Tooltip>
    </Box>
  );
};

export default CountryPagination;
