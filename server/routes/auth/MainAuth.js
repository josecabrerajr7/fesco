const express                       = require("express");
const RootRouter                    = express.Router();

const AuthRoutes                    = require('./AuthRoute');
const UserRoutes                    = require('./UserRoutes');


RootRouter.use(AuthRoutes);
RootRouter.use(UserRoutes);

module.exports = RootRouter;