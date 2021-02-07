import axios from "axios";

export default async function handleRequest(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      await handleGet(req, res);
      break;
    default:
      res.setHeaders("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function handleGet(req, res) {
  const { API_SERVER } = process.env;
  const { country } = req.query;
  const url = API_SERVER + "/api/stats/country/" + country;

  return axios
    .get(url)
    .then((response) => res.status(response.status).json(response.data))
    .catch(({ response }) => res.status(response.status).json(response.data));
}
