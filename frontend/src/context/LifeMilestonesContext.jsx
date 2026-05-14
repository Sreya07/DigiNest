import { createContext, useContext, useState } from "react";

const initialDemoMilestones = [
  {
    id: "birth-1997",
    title: "Birth Certificate Added",
    date: "1997",
    year: 1997,
    description: "The first official identity record in the family archive.",
    category: "identity",
    source: "document",
    eventKind: "document_event",
    importance: "major",
    documents: [{ id: "doc-birth", name: "Birth Certificate", type: "certificate" }],
    images: []
  },
  {
    id: "school-2005",
    title: "School Admission",
    date: "2005",
    year: 2005,
    description: "Primary school admission document stored for future use.",
    category: "education",
    source: "document",
    eventKind: "document_event",
    importance: "important",
    documents: [{ id: "doc-school", name: "School Admission Document", type: "education" }],
    images: []
  },
  {
    id: "marksheet-2012",
    title: "10th Marksheet",
    date: "2012",
    year: 2012,
    description: "A key education milestone linked with verified records.",
    category: "education",
    source: "document",
    eventKind: "document_event",
    importance: "important",
    documents: [{ id: "doc-10th", name: "10th Marksheet", type: "education" }],
    images: []
  },
  {
    id: "graduation-2020",
    title: "Graduation",
    date: "2020",
    year: 2020,
    description: "Degree certificate and graduation memory preserved together.",
    category: "education",
    source: "document",
    eventKind: "document_event",
    importance: "major",
    documents: [{ id: "doc-degree", name: "Degree Certificate", type: "education" }],
    images: []
  },
  {
    id: "internship-2022",
    title: "First Internship",
    date: "2022",
    year: 2022,
    description: "First work experience record added to the personal timeline.",
    category: "career",
    source: "user",
    eventKind: "life_event",
    importance: "important",
    documents: [],
    images: []
  },
  {
    id: "vaccination-2025",
    title: "Child Vaccination",
    date: "2025",
    year: 2025,
    description: "Family health record added with a reminder for next dose.",
    category: "health",
    source: "document",
    eventKind: "document_event",
    importance: "important",
    documents: [{ id: "doc-vaccine", name: "Vaccination Record", type: "health" }],
    images: []
  }
];

const LifeMilestonesContext = createContext();

export function LifeMilestonesProvider({ children }) {
  const [lifeMilestones, setLifeMilestones] = useState(initialDemoMilestones);

  const addMilestone = (milestone) => {
    setLifeMilestones((prev) => [...prev, milestone].sort((a, b) => a.year - b.year));
  };

  const removeMilestone = (id) => {
    setLifeMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <LifeMilestonesContext.Provider value={{ lifeMilestones, addMilestone, removeMilestone }}>
      {children}
    </LifeMilestonesContext.Provider>
  );
}

export function useLifeMilestones() {
  return useContext(LifeMilestonesContext);
}
