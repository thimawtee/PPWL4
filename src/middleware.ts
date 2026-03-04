import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia().use(openapi());

app.get(
  "/admin",
  () => {
    return {
      stats: 99
    };
  },
  {
    beforeHandle({ request, set }) {
      const auth = request.headers.get("authorization");

      if (auth !== "Bearer 123") {
        set.status = 401;

        return {
          success: false,
          message: "Unauthorized"
        };
      }
    }
  }
);

app.listen(3000);
console.log("Server running at http://localhost:3000");