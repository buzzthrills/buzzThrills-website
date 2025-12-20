export const getCallTypesByPlan = (planKey: string) => {
  switch (planKey) {
    case "lite":
      return [
        "Birthday Shout-out",
        "Birthday Music Call",
        "Birthday Prank",
        "Apology Call",
        "Romantic Call",
        "Motivation Call",
        "Appreciation Call",
      ];
    case "plus":
      return [
        "Birthday Shout-out",
        "Birthday Music Call",
        "Birthday Prank Call",
        "Encouragement / Motivation",
        "Romantic Call",
        "Appreciation Call",
        "Apology Call",
      ];
    case "orbit":
      return [
        "Personalized Emotional Call",
        "Motivational Call",
        "Romantic Call",
        "Friendly Check-in",
        "Apology Call",
      ];
    default:
      return [];
  }
};
