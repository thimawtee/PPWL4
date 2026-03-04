import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";

const app = new Elysia()
  .use(openapi())
  .post("/request",
    ({ body }) => {
      return {
        message: "Success",
        data: body
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 3 }),
        email: t.String({ format: "email" }),
        age: t.Number({ minimum: 18 })
      })
    }
  )

app.get(
  "/products/:id",
  ({ params, query }) => ({ params, query }),
  {
    
    params: t.Object({
      id: t.Number()
    }),

    query: t.Object({
      sort: t.Optional(
        t.String({
          enum: ["asc", "desc"]})
      )
    })
  }
)

app.get(
  "/stats",
  () => {
    return {
      total: 100,
      active: 75
    };
  },
  {
    response: t.Object({
      total: t.Number(),
      active: t.Number()
    })
  }
)

  .listen(3000);


console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);