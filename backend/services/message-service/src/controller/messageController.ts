import { NextFunction, Request, Response } from "express";
import Jwt from "../util/jwt";
import userSchema, { UserDocument } from "../model/userSchema";

import { Model } from "mongoose";
import MessageBroker from "../util/messageBroker";

import { AuthRequest } from "../types/api";
import { Event } from "../types/events";

class StoryController {
  private Jwt: Jwt;
  private UserModel: Model<UserDocument>;
  private Kafka: MessageBroker;

  constructor() {
    this.Jwt = new Jwt();
    this.UserModel = userSchema;

    this.Kafka = new MessageBroker();
  }





}

export default StoryController;
