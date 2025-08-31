import { useCallback, useEffect, useState } from "react";

import { Check, ChevronsUpDown, Send, Trash2 } from "lucide-react";

// NOTE: Landing mock – internal client & audience estimation are mocked locally.
import { Button } from "@/lib/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/lib/components/ui/command";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/lib/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { Subtitle } from "@/lib/components/ui/text";

// Local mock hook replacing internal audience estimation.
// Local type definitions (landing mock)
interface FilterCondition {
  field: string;
  operator: string;
  value: string;
  valueType?: string;
}
interface FilterGroup {
  id: string;
  conditions: FilterCondition[];
  connector: "AND" | "OR";
}
interface CampaignData {
  filterGroups?: FilterGroup[];
  groupConnectors?: Record<string, "AND" | "OR">;
}

const getOperatorLabel = (operator: string): string => {
  switch (operator) {
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EQUALS:
      return "Equals";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EQUALS:
      return "Not equals";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_GREATER_THAN:
      return "Greater than";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_GREATER_THAN_OR_EQUAL:
      return "Greater than or equal";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_LESS_THAN:
      return "Less than";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_LESS_THAN_OR_EQUAL:
      return "Less than or equal";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_CONTAINS:
      return "Contains";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_CONTAINS:
      return "Not contains";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_STARTS_WITH:
      return "Starts with";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_ENDS_WITH:
      return "Ends with";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_MATCHES:
      return "Matches";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EXISTS:
      return "Exists";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EXISTS:
      return "Not exists";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_IN:
      return "In";
    case SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_IN:
      return "Not in";
    default:
      return operator;
  }
};

enum SegmentConditionOperator {
  SEGMENT_CONDITION_OPERATOR_UNSPECIFIED = "SEGMENT_CONDITION_OPERATOR_UNSPECIFIED",
  SEGMENT_CONDITION_OPERATOR_EQUALS = "SEGMENT_CONDITION_OPERATOR_EQUALS",
  SEGMENT_CONDITION_OPERATOR_NOT_EQUALS = "SEGMENT_CONDITION_OPERATOR_NOT_EQUALS",
  SEGMENT_CONDITION_OPERATOR_EXISTS = "SEGMENT_CONDITION_OPERATOR_EXISTS",
  SEGMENT_CONDITION_OPERATOR_NOT_EXISTS = "SEGMENT_CONDITION_OPERATOR_NOT_EXISTS",
  SEGMENT_CONDITION_OPERATOR_IN = "SEGMENT_CONDITION_OPERATOR_IN",
  SEGMENT_CONDITION_OPERATOR_NOT_IN = "SEGMENT_CONDITION_OPERATOR_NOT_IN",
  SEGMENT_CONDITION_OPERATOR_GREATER_THAN = "SEGMENT_CONDITION_OPERATOR_GREATER_THAN",
  SEGMENT_CONDITION_OPERATOR_GREATER_THAN_OR_EQUAL = "SEGMENT_CONDITION_OPERATOR_GREATER_THAN_OR_EQUAL",
  SEGMENT_CONDITION_OPERATOR_LESS_THAN = "SEGMENT_CONDITION_OPERATOR_LESS_THAN",
  SEGMENT_CONDITION_OPERATOR_LESS_THAN_OR_EQUAL = "SEGMENT_CONDITION_OPERATOR_LESS_THAN_OR_EQUAL",
  SEGMENT_CONDITION_OPERATOR_CONTAINS = "SEGMENT_CONDITION_OPERATOR_CONTAINS",
  SEGMENT_CONDITION_OPERATOR_NOT_CONTAINS = "SEGMENT_CONDITION_OPERATOR_NOT_CONTAINS",
  SEGMENT_CONDITION_OPERATOR_STARTS_WITH = "SEGMENT_CONDITION_OPERATOR_STARTS_WITH",
  SEGMENT_CONDITION_OPERATOR_ENDS_WITH = "SEGMENT_CONDITION_OPERATOR_ENDS_WITH",
  SEGMENT_CONDITION_OPERATOR_MATCHES = "SEGMENT_CONDITION_OPERATOR_MATCHES",
}

enum DevicePlatformType {
  DEVICE_PLATFORM_TYPE_UNSPECIFIED = "DEVICE_PLATFORM_TYPE_UNSPECIFIED",
  DEVICE_PLATFORM_TYPE_IOS = "DEVICE_PLATFORM_TYPE_IOS",
  DEVICE_PLATFORM_TYPE_ANDROID = "DEVICE_PLATFORM_TYPE_ANDROID",
}

enum UserPropertyType {
  USER_PROPERTY_TYPE_UNSPECIFIED = "USER_PROPERTY_TYPE_UNSPECIFIED",
  USER_PROPERTY_TYPE_STRING = "USER_PROPERTY_TYPE_STRING",
  USER_PROPERTY_TYPE_NUMBER = "USER_PROPERTY_TYPE_NUMBER",
  USER_PROPERTY_TYPE_BOOLEAN = "USER_PROPERTY_TYPE_BOOLEAN",
}

interface UserProperty {
  name: string;
  type: UserPropertyType;
  value_string: string;
}

// ---- MOCKS (landing only) --------------------------------------------------
// Mock internal client (returns a tiny set of custom properties)
const clixInternalClient = {
  listUserPropertyMetadata: async ({ project_id }: { project_id: string }) => {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 180));
    // A more realistic mix of user attributes (string/number/boolean)
    return {
      properties: [
        {
          name: "country",
          type: "USER_PROPERTY_TYPE_STRING",
          value_string: "",
        },
        {
          name: "language",
          type: "USER_PROPERTY_TYPE_STRING",
          value_string: "",
        },
        {
          name: "subscription_plan",
          type: "USER_PROPERTY_TYPE_STRING",
          value_string: "",
        },
        {
          name: "sessions_last_7d",
          type: "USER_PROPERTY_TYPE_NUMBER",
          value_string: "",
        },
        {
          name: "lifetime_sessions",
          type: "USER_PROPERTY_TYPE_NUMBER",
          value_string: "",
        },
        {
          name: "last_purchase_at",
          type: "USER_PROPERTY_TYPE_STRING",
          value_string: "",
        },
        {
          name: "has_made_purchase",
          type: "USER_PROPERTY_TYPE_BOOLEAN",
          value_string: "",
        },
        {
          name: "push_opt_in",
          type: "USER_PROPERTY_TYPE_BOOLEAN",
          value_string: "",
        },
        {
          name: "is_beta_user",
          type: "USER_PROPERTY_TYPE_BOOLEAN",
          value_string: "",
        },
      ],
    } as { properties: UserProperty[] };
  },
};

// Mock audience estimation hook (derives a pseudo size from filter complexity)
function useEstimateAudience({
  projectId,
  campaignData,
  enabled,
}: {
  projectId: string;
  campaignData: any;
  enabled: boolean;
}) {
  const [data, setData] = useState<{ audience_count: string } | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    setIsLoading(true);
    const t = setTimeout(() => {
      const base = 52000; // baseline mock
      const conditions = (campaignData.filterGroups || []).reduce(
        (acc: number, g: any) => acc + (g.conditions?.length || 0),
        0
      );
      const groups = (campaignData.filterGroups || []).length || 1;
      // Simple diminishing formula
      const estimate = Math.max(
        800,
        Math.round(
          base * Math.pow(0.92, conditions) * Math.pow(0.97, groups - 1)
        )
      );
      setData({ audience_count: estimate.toString() });
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(t);
  }, [projectId, campaignData, enabled]);
  return { data, isLoading } as const;
}
// ---------------------------------------------------------------------------

// Constants
const DEFAULT_CONDITION: FilterCondition = {
  field: "user_id",
  operator: SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EQUALS,
  value: "",
};

const PREDEFINED_FIELDS = [
  { value: "user_id", label: "User ID" },
  { value: "last_session_at", label: "Last Session At" },
  { value: "platform", label: "Platform" },
  { value: "app_version", label: "App Version" },
];

const VALUE_TYPE_OPTIONS = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
];

// valueType별 지원하는 연산자 매핑
const getOperatorsByValueType = (valueType: string) => {
  const createOperator = (value: string) => ({
    value,
    label: getOperatorLabel(value),
  });

  switch (valueType) {
    case "number":
      return [
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EQUALS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EQUALS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_GREATER_THAN
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_GREATER_THAN_OR_EQUAL
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_LESS_THAN
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_LESS_THAN_OR_EQUAL
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EXISTS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EXISTS
        ),
        createOperator(SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_IN),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_IN
        ),
      ];
    case "text":
      return [
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EQUALS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EQUALS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_CONTAINS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_CONTAINS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_STARTS_WITH
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_ENDS_WITH
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_MATCHES
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EXISTS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EXISTS
        ),
        createOperator(SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_IN),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_IN
        ),
      ];
    case "boolean":
      return [
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EQUALS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EQUALS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EXISTS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EXISTS
        ),
      ];
    case "select":
    default:
      return [
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EQUALS
        ),
        createOperator(
          SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EQUALS
        ),
      ];
  }
};

// Platform 필드의 옵션들을 반환하는 함수
const getPlatformOptions = () => [
  { value: DevicePlatformType.DEVICE_PLATFORM_TYPE_IOS, label: "iOS" },
  { value: DevicePlatformType.DEVICE_PLATFORM_TYPE_ANDROID, label: "Android" },
];

// 필드 라벨을 가져오는 헬퍼 함수
const getFieldLabel = (
  field: string,
  allFields: Array<{ value: string; label: string }>
): string => {
  const foundField = allFields.find((f) => f.value === field);
  return foundField ? foundField.label : field;
};

// 필드에 따른 valueType 매핑
const getValueTypeByField = (
  field: string,
  customProperties: UserProperty[]
): string => {
  // First check predefined fields
  switch (field) {
    case "user_id":
      return "text";
    case "last_session_at":
      return "text";
    case "platform":
      return "select";
    case "app_version":
      return "text";
    default:
      // Check custom properties
      const customProperty = customProperties.find(
        (prop) => prop.name === field
      );
      if (customProperty) {
        switch (customProperty.type) {
          case "USER_PROPERTY_TYPE_STRING":
            return "text";
          case "USER_PROPERTY_TYPE_NUMBER":
            return "number";
          case "USER_PROPERTY_TYPE_BOOLEAN":
            return "boolean";
          default:
            return "text";
        }
      }
      return "text";
  }
};

// valueType 값을 라벨로 변환
const getValueTypeLabel = (valueType: string): string => {
  const option = VALUE_TYPE_OPTIONS.find((opt) => opt.value === valueType);
  return option ? option.label : "Text";
};

const CONNECTOR_BUTTON_STYLES =
  "rounded-lg text-xs font-medium bg-core-800 text-black hover:bg-core-600 px-4 py-2";

interface Step2AudienceProps {
  projectId?: string; // optional demo id
  initialCampaignData?: Partial<CampaignData>;
  onChange?: (data: CampaignData) => void;
  showNavigation?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
}

// Standalone mock audience builder (no backend required)
export function Step2Audience({
  projectId = "demo-project",
  initialCampaignData,
  onChange,
  showNavigation = false,
  onNext,
  onPrevious,
}: Step2AudienceProps = {}) {
  const [campaignData, setCampaignData] = useState<CampaignData>(() => ({
    // (subscription_plan = pro OR sessions_last_7d >= 3) AND (push_opt_in = true)
    filterGroups: initialCampaignData?.filterGroups || [
      {
        id: "1",
        connector: "OR", // intra-group connector between the two conditions
        conditions: [
          {
            field: "subscription_plan",
            operator:
              SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EQUALS,
            value: "pro",
          },
          {
            field: "sessions_last_7d",
            operator:
              SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_GREATER_THAN_OR_EQUAL,
            value: "3",
          },
        ],
      },
      {
        id: "2",
        connector: "AND",
        conditions: [
          {
            field: "push_opt_in",
            operator:
              SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EQUALS,
            value: "true",
          },
        ],
      },
    ],
    groupConnectors: initialCampaignData?.groupConnectors || { "1-2": "AND" },
  }));
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>(
    campaignData.filterGroups || []
  );

  const [groupConnectors, setGroupConnectors] = useState<
    Record<string, "AND" | "OR">
  >(campaignData.groupConnectors || {});

  // Debounced filterGroups for input changes only (500ms delay)
  const [debouncedFilterGroups, setDebouncedFilterGroups] =
    useState<FilterGroup[]>(filterGroups);

  // filterGroups debounce 처리 - Input 입력 시에만 (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilterGroups(filterGroups);
    }, 500);

    return () => clearTimeout(timer);
  }, [filterGroups]);

  // 사용자 수 추정 API 호출 (filterGroups만 debounced, 나머지는 즉시 반영)
  const { data: audienceEstimate, isLoading: isEstimating } =
    useEstimateAudience({
      projectId,
      campaignData: {
        filterGroups: debouncedFilterGroups,
        groupConnectors,
      },
      enabled: true,
    });
  const [customProperties, setCustomProperties] = useState<UserProperty[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);

  // Popover open 상태를 개별적으로 관리하는 상태 (groupId-conditionIndex 형태의 키)
  const [popoverStates, setPopoverStates] = useState<Record<string, boolean>>(
    {}
  );

  // Custom properties 를 fetch하는 useEffect
  useEffect(() => {
    const fetchCustomProperties = async () => {
      setIsLoadingProperties(true);
      try {
        const response = await clixInternalClient.listUserPropertyMetadata({
          project_id: projectId,
        });
        setCustomProperties(response.properties || []);
      } catch (error) {
        console.error("Failed to fetch custom properties:", error);
        setCustomProperties([]);
      } finally {
        setIsLoadingProperties(false);
      }
    };

    fetchCustomProperties();
  }, [projectId]);

  // Predefined fields와 custom properties를 결합
  const allFields = [
    ...PREDEFINED_FIELDS,
    ...customProperties.map((prop) => ({
      value: prop.name,
      label: prop.name,
      type: prop.type,
    })),
  ];

  // 사용자 수 포맷팅 함수
  const formatUserCount = (count?: string): string => {
    if (isEstimating) return "...";
    if (!count) return "0";

    const numCount = parseInt(count, 10);
    if (isNaN(numCount)) return "0";

    // 천 단위 콤마 추가
    return numCount.toLocaleString();
  };

  // filterGroups 변경을 campaignData에 반영하는 함수
  const syncCampaign = useCallback(
    (updater: (prev: CampaignData) => CampaignData) => {
      setCampaignData((prev) => {
        const next = updater(prev);
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  const updateCampaignFilterGroups = useCallback(
    (groups: FilterGroup[]) => {
      setFilterGroups(groups);
      syncCampaign((prev) => ({ ...prev, filterGroups: groups }));
    },
    [syncCampaign]
  );

  const toggleConnector = (groupId1: string, groupId2: string) => {
    const connectorKey = `${groupId1}-${groupId2}`;
    const newConnectors: Record<string, "AND" | "OR"> = {
      ...groupConnectors,
      [connectorKey]: groupConnectors[connectorKey] === "OR" ? "AND" : "OR",
    };
    setGroupConnectors(newConnectors);
    syncCampaign((prev) => ({ ...prev, groupConnectors: newConnectors }));
  };

  const getConnectorType = (
    groupId1: string,
    groupId2: string
  ): "AND" | "OR" => {
    const connectorKey = `${groupId1}-${groupId2}`;
    return groupConnectors[connectorKey] || "AND";
  };

  // 그룹 내 조건들의 연결자를 가져오는 함수 (filterGroups에서 직접 가져오기)
  const getGroupConditionConnector = (groupId: string): "AND" | "OR" => {
    const group = filterGroups.find((g) => g.id === groupId);
    return group?.connector || "AND";
  };

  // 그룹 내 조건들의 연결자를 업데이트하는 함수 (그룹 전체에 적용)
  const updateGroupConditionConnector = (
    groupId: string,
    connector: "AND" | "OR"
  ) => {
    const updatedFilterGroups = filterGroups.map((group) =>
      group.id === groupId ? { ...group, connector } : group
    );
    setFilterGroups(updatedFilterGroups);
    syncCampaign((prev) => ({ ...prev, filterGroups: updatedFilterGroups }));
  };

  // Popover 상태를 가져오고 업데이트하는 함수들
  const getPopoverOpen = (groupId: string, conditionIndex: number): boolean => {
    const key = `${groupId}-${conditionIndex}`;
    return popoverStates[key] || false;
  };

  const setPopoverOpen = (
    groupId: string,
    conditionIndex: number,
    open: boolean
  ) => {
    const key = `${groupId}-${conditionIndex}`;
    setPopoverStates((prev) => ({
      ...prev,
      [key]: open,
    }));
  };

  const addGroup = () => {
    const newGroupId = (filterGroups.length + 1).toString();
    const newGroup: FilterGroup = {
      id: newGroupId,
      conditions: [DEFAULT_CONDITION],
      connector: "AND",
    };
    updateCampaignFilterGroups([...filterGroups, newGroup]);
  };

  const removeGroup = (groupId: string) => {
    // 그룹 삭제 후 ID 재정렬
    const filteredGroups = filterGroups.filter((group) => group.id !== groupId);
    const reindexedGroups = filteredGroups.map((group, index) => ({
      ...group,
      id: (index + 1).toString(),
    }));

    updateCampaignFilterGroups(reindexedGroups);

    // 연결자 상태도 새로운 ID에 맞게 재정렬
    setGroupConnectors((prev) => {
      const newConnectors: Record<string, "AND" | "OR"> = {};
      // 새로운 그룹 순서에 맞게 연결자 재생성
      for (let i = 0; i < reindexedGroups.length - 1; i++) {
        const currentGroupId = (i + 1).toString();
        const nextGroupId = (i + 2).toString();
        const key = `${currentGroupId}-${nextGroupId}`;

        // 기존 연결자 값이 있다면 유지, 없다면 기본값 'AND'
        const existingConnector = Object.values(prev)[i] || "AND";
        newConnectors[key] = existingConnector;
      }
      return newConnectors;
    });
  };

  const addFilterToGroup = (groupId: string) => {
    const newGroups = filterGroups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            conditions: [...group.conditions, { ...DEFAULT_CONDITION }],
          }
        : group
    );
    updateCampaignFilterGroups(newGroups);
  };

  const updateConditionValue = (
    groupId: string,
    conditionIndex: number,
    value: string
  ) => {
    const newGroups = filterGroups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            conditions: group.conditions.map((condition, index) =>
              index === conditionIndex ? { ...condition, value } : condition
            ),
          }
        : group
    );
    updateCampaignFilterGroups(newGroups);
  };

  // field가 변경될 때 자동으로 valueType을 설정하는 함수
  const updateConditionField = (
    groupId: string,
    conditionIndex: number,
    field: string
  ) => {
    const valueType = getValueTypeByField(field, customProperties);
    const defaultOperator =
      getOperatorsByValueType(valueType)[0]?.value ||
      SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EQUALS;
    const newGroups = filterGroups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            conditions: group.conditions.map((condition, index) =>
              index === conditionIndex
                ? {
                    ...condition,
                    field,
                    valueType,
                    operator: defaultOperator,
                    value: "",
                  } // field 변경 시 valueType, operator, 값 자동 설정
                : condition
            ),
          }
        : group
    );
    updateCampaignFilterGroups(newGroups);
  };

  // operator를 업데이트하는 함수
  const updateConditionOperator = (
    groupId: string,
    conditionIndex: number,
    operator: string
  ) => {
    // EXISTS/NOT_EXISTS 연산자일 때는 값을 빈문자열로 설정
    const shouldClearValue =
      operator === SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EXISTS ||
      operator ===
        SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EXISTS;

    const newGroups = filterGroups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            conditions: group.conditions.map((condition, index) =>
              index === conditionIndex
                ? {
                    ...condition,
                    operator,
                    value: shouldClearValue ? "" : condition.value,
                  }
                : condition
            ),
          }
        : group
    );
    updateCampaignFilterGroups(newGroups);
  };

  // 개별 필터 삭제 함수
  const removeFilterFromGroup = (groupId: string, conditionIndex: number) => {
    const group = filterGroups.find((g) => g.id === groupId);
    if (!group) return;

    // 그룹의 마지막 필터를 삭제하려는 경우
    if (group.conditions.length === 1) {
      removeGroup(groupId);
      return;
    }

    // 일반적인 필터 삭제
    const newGroups = filterGroups.map((group) =>
      group.id === groupId
        ? {
            ...group,
            conditions: group.conditions.filter(
              (_, index) => index !== conditionIndex
            ),
          }
        : group
    );
    updateCampaignFilterGroups(newGroups);
  };

  // 복잡한 그룹 렌더링 로직을 별도 함수로 분리
  const renderFilterGroups = () => {
    const renderGroup = (group: FilterGroup) => (
      <div key={`group-content-${group.id}`}>
        {/* Group Header */}
        <div className="mb-4">
          <h3 className="text-white font-medium">Group {group.id}</h3>
        </div>

        {/* Condition Row */}
        {group.conditions.map((condition, conditionIndex) => (
          <div key={conditionIndex}>
            <div className="space-y-3">
              {/* First row: Field and Operator selects with trash can */}
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <Popover
                    open={getPopoverOpen(group.id, conditionIndex)}
                    onOpenChange={(open) =>
                      setPopoverOpen(group.id, conditionIndex, open)
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={getPopoverOpen(group.id, conditionIndex)}
                        className="bg-core-700 text-white border-core-600 justify-between w-full h-9 px-3"
                      >
                        {getFieldLabel(condition.field, allFields)}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search field name..." />
                        <CommandList>
                          <CommandGroup>
                            {allFields.map((field) => (
                              <CommandItem
                                key={field.value}
                                value={field.value}
                                onSelect={(currentValue) => {
                                  updateConditionField(
                                    group.id,
                                    conditionIndex,
                                    currentValue
                                  );
                                  setPopoverOpen(
                                    group.id,
                                    conditionIndex,
                                    false
                                  );
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    condition.field === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                {field.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex-1">
                  <Select
                    value={condition.operator}
                    onValueChange={(value) =>
                      updateConditionOperator(group.id, conditionIndex, value)
                    }
                  >
                    <SelectTrigger className="bg-core-700 text-white w-full h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getOperatorsByValueType(
                        getValueTypeByField(condition.field, customProperties)
                      ).map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* 개별 필터 삭제 버튼 */}
                {!(
                  filterGroups.length === 1 && group.conditions.length === 1
                ) ? (
                  <Button
                    variant="ghost"
                    size="lg"
                    className="flex-shrink-0 h-9 has-[>svg]:px-2 text-gray-400"
                    onClick={() =>
                      removeFilterFromGroup(group.id, conditionIndex)
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                ) : (
                  <div className="p-2 flex-shrink-0 w-8 h-9">
                    {/* 빈 공간 */}
                  </div>
                )}
              </div>

              {/* Second row: Value type (readonly) and input */}
              <div className="flex gap-3 items-center">
                <div className="w-30 flex-shrink-0">
                  <Input
                    value={getValueTypeLabel(
                      getValueTypeByField(condition.field, customProperties)
                    )}
                    readOnly
                    className="bg-core-700 text-white w-full h-9 cursor-default border-none"
                  />
                </div>
                {/* EXISTS/NOT_EXISTS 연산자일 때는 값 입력 필드를 숨김 */}
                {condition.operator ===
                  SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_EXISTS ||
                condition.operator ===
                  SegmentConditionOperator.SEGMENT_CONDITION_OPERATOR_NOT_EXISTS ? null : condition.field ===
                  "platform" ? (
                  <Select
                    value={condition.value}
                    onValueChange={(value) =>
                      updateConditionValue(group.id, conditionIndex, value)
                    }
                  >
                    <SelectTrigger className="bg-core-700 text-white border-core-600 flex-1 h-9">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {getPlatformOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : getValueTypeByField(condition.field, customProperties) ===
                  "boolean" ? (
                  <Select
                    value={condition.value}
                    onValueChange={(value) =>
                      updateConditionValue(group.id, conditionIndex, value)
                    }
                  >
                    <SelectTrigger className="bg-core-700 text-white border-core-600 flex-1 h-9">
                      <SelectValue placeholder="Select value" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={
                      getValueTypeByField(condition.field, customProperties) ===
                      "number"
                        ? "number"
                        : "text"
                    }
                    value={condition.value}
                    onChange={(e) =>
                      updateConditionValue(
                        group.id,
                        conditionIndex,
                        e.target.value
                      )
                    }
                    placeholder="Enter value"
                    className="bg-core-700 text-white placeholder-core-500 flex-1 h-9"
                  />
                )}
                <div className="p-2 flex-shrink-0 w-8 h-9">{/* 빈 공간 */}</div>
              </div>
            </div>

            {/* 조건 간 연결자 (마지막 조건이 아닌 경우에만 표시, 그룹 내 통일) */}
            {conditionIndex < group.conditions.length - 1 && (
              <div className="flex justify-center py-4">
                <button
                  className="px-3 py-1 bg-core-500 hover:bg-core-400 text-white text-xs font-medium rounded-full transition-colors"
                  onClick={() => {
                    // 그룹 내 모든 조건 간 연결자 토글 (통일)
                    const currentConnector = getGroupConditionConnector(
                      group.id
                    );
                    const newConnector =
                      currentConnector === "AND" ? "OR" : "AND";
                    updateGroupConditionConnector(group.id, newConnector);
                  }}
                >
                  {getGroupConditionConnector(group.id)}
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add filter button */}
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-core-600 mt-2"
          onClick={() => addFilterToGroup(group.id)}
        >
          + Add filter
        </Button>
      </div>
    );

    const renderConnector = (
      group: FilterGroup,
      nextGroup: FilterGroup,
      connectorType: "AND" | "OR"
    ) => {
      if (connectorType === "AND") {
        // AND: 구분선과 버튼 오버레이
        return (
          <div
            key={`connector-${group.id}-${nextGroup.id}`}
            className="relative py-4"
          >
            <div className="absolute inset-0 flex items-center -mx-6">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center">
              <button
                onClick={() => toggleConnector(group.id, nextGroup.id)}
                className={CONNECTOR_BUTTON_STYLES}
              >
                {connectorType}
              </button>
            </div>
          </div>
        );
      } else {
        // OR: 단순 버튼
        return (
          <div
            key={`connector-${group.id}-${nextGroup.id}`}
            className="flex justify-center"
          >
            <button
              onClick={() => toggleConnector(group.id, nextGroup.id)}
              className={CONNECTOR_BUTTON_STYLES}
            >
              {connectorType}
            </button>
          </div>
        );
      }
    };

    const result = [];
    let i = 0;
    while (i < filterGroups.length) {
      const currentGroup = filterGroups[i];
      const nextGroup = filterGroups[i + 1];

      if (!currentGroup) {
        i++;
        continue;
      }

      if (nextGroup) {
        const connectorType = getConnectorType(currentGroup.id, nextGroup.id);

        if (connectorType === "AND") {
          // AND: 연속된 AND 그룹들을 하나의 컨테이너에 묶기
          const andGroups = [currentGroup];
          let j = i + 1;

          while (j < filterGroups.length) {
            const nextInSequence = filterGroups[j];
            if (!nextInSequence) break;
            andGroups.push(nextInSequence);

            const nextAfterSequence = filterGroups[j + 1];
            if (
              !nextAfterSequence ||
              getConnectorType(nextInSequence.id, nextAfterSequence.id) !==
                "AND"
            ) {
              break;
            }
            j++;
          }

          // AND 그룹들을 하나의 컨테이너에 렌더링
          result.push(
            <div
              key={`and-container-${currentGroup.id}`}
              className="bg-core-100 border rounded-md px-6 py-4 space-y-4"
            >
              {andGroups.map((group, groupIndex) => {
                const nextInAndGroup = andGroups[groupIndex + 1];
                return (
                  <div key={group.id}>
                    {renderGroup(group)}
                    {nextInAndGroup &&
                      renderConnector(group, nextInAndGroup, "AND")}
                  </div>
                );
              })}
            </div>
          );

          i = j + 1;

          // AND 컨테이너 후에 OR 연결자가 있으면 추가
          const nextAfterContainer = filterGroups[j + 1];
          const lastAndGroup = andGroups[andGroups.length - 1];
          if (nextAfterContainer && lastAndGroup) {
            result.push(
              renderConnector(lastAndGroup, nextAfterContainer, "OR")
            );
          }
        } else {
          // OR: 개별 박스로 렌더링
          result.push(
            <div
              key={`or-container-${currentGroup.id}`}
              className="bg-core-100 border rounded-md px-6 py-4 space-y-4"
            >
              {renderGroup(currentGroup)}
            </div>
          );
          result.push(renderConnector(currentGroup, nextGroup, connectorType));
          i++;
        }
      } else {
        // 마지막 그룹
        result.push(
          <div
            key={`last-container-${currentGroup.id}`}
            className="bg-core-100 border rounded-md px-6 py-4 space-y-4"
          >
            {renderGroup(currentGroup)}
          </div>
        );
        i++;
      }
    }

    return result;
  };

  return (
    <div className="space-y-6">
      <Subtitle className="text-muted-foreground border-b pb-4">
        Define the audience conditions for this campaign.
      </Subtitle>

      <div className="space-y-4">
        {renderFilterGroups()}

        <Button
          variant="ghost"
          size="sm"
          onClick={addGroup}
          className="text-white hover:text-core-600 px-2"
        >
          + Add group
        </Button>

        <div className="bg-core-100 border rounded-md p-3 flex items-center gap-3 text-sm">
          <div className="text-muted-foreground">
            <Send className="w-4 h-4" />
          </div>
          <span className="text-muted-foreground">
            Will be sent to approx.{" "}
            {formatUserCount(audienceEstimate?.audience_count)} users
          </span>
        </div>
      </div>

      {showNavigation && (
        <div className="pt-4 border-t">
          <div className="flex justify-between w-full">
            {onPrevious && (
              <Button variant="outline" onClick={onPrevious}>
                Back
              </Button>
            )}
            {onNext && (
              <Button onClick={onNext}>Next: Compose your notification</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
