import { AppType } from "../../hono/src/index";
import { hc } from "hono/client";

const test = async () => {
  const client = hc<AppType>("http://localhost:8787/");

  const response = await client.test[":id"].$get({
    param: {
      id: "1",
    },
    query: {
      name: "Hono",
    },
  });

  console.log(response);
};

export default test;
