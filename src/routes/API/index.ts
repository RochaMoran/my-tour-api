import express from "express";
import usersRoutes from "./users.routes";
import sitesRoutes from "./sites.routes";

const app = express();

app.use("/", (_req, res) => {
  res.send("Hello World!");
});
app.use("/users", usersRoutes);
app.use("/sites", sitesRoutes);

export default app;
