// Original 2026-09-07 editorial benchmark; retained as historical data.
export const benchmark = {
  date: "2026-09-07",
  profiles: [
    ["research.profile", "Portfolio reference", 89],
    ["research.junior", "Junior reference", 58],
    ["research.mid", "Mid reference", 68],
    ["research.senior", "Senior reference", 82],
  ],
  dimensions: [
    ["Technical breadth", 95, 84, 96],
    ["Systems / architecture", 91, 76, 95],
    ["AI / agents / knowledge", 96, 70, 91],
    ["Web / frontend", 90, 78, 95],
    ["Backend / data", 78, 86, 96],
    ["3D / games / creative tech", 93, 65, 82],
    ["Quality / testing", 84, 83, 94],
    ["Documentation / governance", 93, 82, 93],
    ["Delivery / automation", 86, 84, 95],
  ],
};

export function grade(score) {
  if (score >= 90)
    return { note: "1.0", key: "grade.excellent", label: "Excellent" };
  if (score >= 80) return { note: "2.0", key: "grade.good", label: "Good" };
  if (score >= 65)
    return { note: "3.0", key: "grade.satisfactory", label: "Satisfactory" };
  if (score >= 50) return { note: "4.0", key: "grade.pass", label: "Pass" };
  return { note: "5.0", key: "grade.improve", label: "Needs improvement" };
}
