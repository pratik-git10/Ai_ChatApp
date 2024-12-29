import userModel from "../models/user.model";

export const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("EEmail and Password required");
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = userModel.create({
    email,
    password: hashedPassword,
  });

  return user;
};
