export declare enum DayOfWeek {
  DAY_OF_WEEK_UNSPECIFIED = "DAY_OF_WEEK_UNSPECIFIED",
  DAY_OF_WEEK_SUNDAY = "DAY_OF_WEEK_SUNDAY",
  DAY_OF_WEEK_MONDAY = "DAY_OF_WEEK_MONDAY",
  DAY_OF_WEEK_TUESDAY = "DAY_OF_WEEK_TUESDAY",
  DAY_OF_WEEK_WEDNESDAY = "DAY_OF_WEEK_WEDNESDAY",
  DAY_OF_WEEK_THURSDAY = "DAY_OF_WEEK_THURSDAY",
  DAY_OF_WEEK_FRIDAY = "DAY_OF_WEEK_FRIDAY",
  DAY_OF_WEEK_SATURDAY = "DAY_OF_WEEK_SATURDAY",
}

export interface FilterCondition {
  field: string;
  operator: string;
  value: string;
  valueType?: string;
}

export interface FilterGroup {
  id: string;
  conditions: FilterCondition[];
  connector: "AND" | "OR";
}

export interface CampaignData {
  name: string;
  description: string;
  audienceType: "all" | "filtered";
  filterGroups?: FilterGroup[];
  groupConnectors?: Record<string, "AND" | "OR">;
  notification?: {
    title: string;
    body: string;
    imageUrl: string;
    landingUrl: string;
  };
  schedule?: {
    type:
      | "send-immediately"
      | "send-once"
      | "send-daily"
      | "send-specific-days";
    // Send once 설정
    date?: Date;
    time?: string;
    timezone?: string;
    // Send daily 설정
    dailyStartDate?: Date;
    dailyEndDate?: Date;
    dailyIsIndefinitely?: boolean;
    // Send specific days 설정
    specificStartDate?: Date;
    specificEndDate?: Date;
    specificIsIndefinitely?: boolean;
    repeatWeeks?: number;
    selectedDays?: DayOfWeek[];
  };
}

export interface CampaignStep {
  step: number;
  title: string;
}
