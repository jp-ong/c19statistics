import { Tooltip, Button, Box } from "@material-ui/core";
import { Public as PublicIcon, Home as HomeIcon } from "@material-ui/icons";
import { useRouter } from "next/router";
import Link from "next/link";

const RouterButtons = ({ homeButton, countryButton }) => {
  const router = useRouter();
  return (
    <Box display="flex" flexWrap="wrap" gridGap=".25em">
      <Tooltip title="Go to home page" arrow placement="top">
        <Link href="/" passHref>
          <Button
            startIcon={<HomeIcon />}
            variant="text"
            disabled={!homeButton}
          >
            Home
          </Button>
        </Link>
      </Tooltip>
      <Tooltip title="Latest statistics of every country" arrow placement="top">
        <Link href="/latest" passHref>
          <Button
            startIcon={<PublicIcon />}
            variant="text"
            disabled={!countryButton}
          >
            Countries
          </Button>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default RouterButtons;
