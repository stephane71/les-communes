const USAGE_PLAN_NAME = "ReadFreeAccess";

const USAGE_PLAN = {
  id: `${USAGE_PLAN_NAME}-UsagePlan`,
  usagePlanProps: {
    name: USAGE_PLAN_NAME,
    throttle: {
      rateLimit: 10,
      burstLimit: 2,
    },
  },
};

export default USAGE_PLAN;
