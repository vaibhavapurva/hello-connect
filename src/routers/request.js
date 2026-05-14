const mongoose = require("mongoose");
const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
// express.Router();

const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    const formUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const ALLOWED_STATUS = ["ignored", "interested"];
    const isAllowedStatus = ALLOWED_STATUS.includes(status);
    if (!isAllowedStatus) {
      return res.status(400).json({ message: "this request is not valid" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "to user not found" });
    }
    // if (formUserId == toUserId) {
    //   return res
    //     .status(400)
    //     .json({ message: "sender does not send request to self" });
    // }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { formUserId, toUserId },
        { formUserId: toUserId, toUserId: formUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({ message: "you have send request pervies" });
    }
    try {
        console.log("hdhdhdjh")
      const connectionRequest = new ConnectionRequest({
        formUserId,
        toUserId,
        status,
      });
      console.log(connectionRequest)
      const data = await connectionRequest.save();
      console.log(data)
      res.send("connteions request send");
    } catch (err) {
      res.status(400).send("something errorgggg "+ err.message);
    }
  },
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    const logedInUser = req.user._id;
    const { status, requestId } = req.params;
    try {
      const ALLOWED_STATUS = ["accepeted", "rejected"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res
          .status(400)
          .json({ message: `request method is not allowed` });
      }

      const connectionRequestfind = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: logedInUser,
        status: "interested",
      });
      if (!connectionRequestfind) {
        return res
          .status(404)
          .json({ message: "connection request not found" });
      }

      connectionRequestfind.status = status;
      const data = await connectionRequestfind.save();
      res.json({ message: `requested ${status}` });
    } catch (err) {
      res.status(400).send("something wrong "+ err.message);
    }
  },
);

module.exports = requestRouter;
