import { User } from "src/schemas/user.schema";
import { mapStatisticsFromDb } from "./map-statistics.helper";

export const mapUserFromDb = (user: User) => ({
  id: user._id,
  email: user.email,
  statistics: mapStatisticsFromDb(user.statistics),
  username: user.username,
});
