import { User } from "src/schemas/user.schema";

export const mapUserFromDb = (user: User) => ({
  id: user._id,
  email: user.email,
  username: user.username,
});
