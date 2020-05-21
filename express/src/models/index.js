import mongoose from 'mongoose';
import config from '../../config';

import User from './user';
// import OtherModel from ./OtherModel

const connectDb = () => {
  return mongoose.connect(config.dbUrl);
};

const models = {
  User
  // OtherModel
};

export { connectDb };
export default models;
