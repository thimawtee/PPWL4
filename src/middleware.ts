import { Elysia, t } from "elysia";
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

app.onAfterHandle(({ response }) => {
  return {
    success: true,
    message: "data tersedia",
    data: response
  };
});

app.get("/product", () => ({
  id: 1,
  name: "Laptop"
}));

app.onError(({ code, set }) => {
    if (code === "VALIDATION") {
      set.status = 400;
      return {
        success: false,
        error: "Validation Error"
      };
    }
  });

app.post(
  "/login",
  ({ body }) => {
    return {
      message: "Login berhasil"
    };
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String({ minLength: 8 })
    })
  }
);

app.listen(3000);
console.log("Server running at http://localhost:3000");