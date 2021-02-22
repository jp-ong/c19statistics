import { Tooltip, Button } from "@material-ui/core";
import { Public as PublicIcon, Home as HomeIcon } from "@material-ui/icons";
import { useRouter } from "next/router";

const RouterButtons = ({ homeButton, countryButton }) => {
  const router = useRouter();
  return (
    <>
      <Tooltip title="Go to home page" arrow placement="top">
        <Button
          onClick={() => router.push("/")}
          onMouseOver={() => router.prefetch("/")}
          startIcon={<HomeIcon />}
          variant="outlined"
          disabled={!homeButton}
        >
          Home
        </Button>
      </Tooltip>
      <Tooltip title="Latest statistics of every country" arrow placement="top">
        <Button
          onClick={() => router.push("/latest")}
          onMouseOver={() => router.prefetch("/latest")}
          startIcon={<PublicIcon />}
          variant="outlined"
          disabled={!countryButton}
        >
          Countries
        </Button>
      </Tooltip>
    </>
  );
};

export default RouterButtons;
