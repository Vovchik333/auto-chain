import { User } from "src/schemas/user.schema";

export const mapUserFromDb = (user: User) => ({
  id: user._id,
  email: user.email,
  statisticsId: user.statisticsId,
  username: user.username,
  isSyncWithBlockchain: user.isSyncWithBlockchain
});
