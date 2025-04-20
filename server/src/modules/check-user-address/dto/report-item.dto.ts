import { ReliabilityLevel } from "src/common/enums/report/reliability-level.enum";
import { ValueOf } from "src/common/types/value-of.type";

type ReportItemDto = {
  description: string;
  reliabilityLevel: ValueOf<typeof ReliabilityLevel>;
}

export { type ReportItemDto };
