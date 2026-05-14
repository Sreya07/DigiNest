/**
 * Document Mindmap Structure
 * Central node represents "My Citizen Data"
 * Branches represent document clusters with connected concepts
 */

export const mindmapData = {
  central: {
    id: "citizen-data",
    label: "My Citizen Data",
    description: "Complete personal and family record ecosystem",
    emotion: "trust",
  },
  branches: [
    {
      id: "identity",
      label: "Identity",
      emotion: "trust",
      color: "from-blue-600 to-cyan-500",
      icon: "Fingerprint",
      description: "Foundational identity proofs",
      documents: ["aadhaar", "pan", "passport"],
      fields: [
        { name: "Name", sensitivity: "high" },
        { name: "Date of Birth", sensitivity: "high" },
        { name: "Address", sensitivity: "high" },
        { name: "Document Number", sensitivity: "high" },
      ],
      relatedReminders: ["Passport renewal", "Aadhaar update"],
      recommendation: "Safe for selective sharing to banks and government agencies",
      sensitivity: "high",
    },
    {
      id: "education",
      label: "Education",
      emotion: "intelligence",
      color: "from-purple-600 to-fuchsia-500",
      icon: "BookOpen",
      description: "Academic achievements and credentials",
      documents: ["marksheet-10", "degree"],
      fields: [
        { name: "Name", sensitivity: "medium" },
        { name: "Institution", sensitivity: "medium" },
        { name: "Degree/Class", sensitivity: "medium" },
        { name: "Graduation Year", sensitivity: "low" },
      ],
      relatedReminders: ["Scholarship applications"],
      recommendation: "Safe to share for job applications and further education",
      sensitivity: "medium",
    },
    {
      id: "health",
      label: "Health",
      emotion: "safety",
      color: "from-emerald-500 to-green-400",
      icon: "Heart",
      description: "Medical records and health coverage",
      documents: ["vaccination", "insurance"],
      fields: [
        { name: "Vaccination Status", sensitivity: "high" },
        { name: "Health Conditions", sensitivity: "high" },
        { name: "Insurance Coverage", sensitivity: "high" },
        { name: "Medical History", sensitivity: "high" },
      ],
      relatedReminders: ["Vaccination due", "Insurance renewal"],
      recommendation: "Share selectively with authorized medical practitioners only",
      sensitivity: "high",
    },
    {
      id: "family",
      label: "Family",
      emotion: "family",
      color: "from-pink-500 to-rose-400",
      icon: "Users",
      description: "Family relationships and records",
      documents: ["birth"],
      fields: [
        { name: "Child Name", sensitivity: "high" },
        { name: "Parent Information", sensitivity: "high" },
        { name: "Relationship Proof", sensitivity: "high" },
        { name: "Date of Birth", sensitivity: "high" },
      ],
      relatedReminders: ["Child document renewal"],
      recommendation: "Restrict to family members and official institutions",
      sensitivity: "high",
    },
    {
      id: "finance",
      label: "Finance",
      emotion: "professional",
      color: "from-slate-600 to-gray-500",
      icon: "CreditCard",
      description: "Financial and tax documents",
      documents: ["pan"],
      fields: [
        { name: "Tax ID", sensitivity: "high" },
        { name: "Income Information", sensitivity: "high" },
        { name: "Bank Account", sensitivity: "high" },
        { name: "Financial Assets", sensitivity: "high" },
      ],
      relatedReminders: ["Tax filing deadline"],
      recommendation: "Share with banks, government, and authorized financial institutions",
      sensitivity: "high",
    },
    {
      id: "vehicle",
      label: "Vehicle",
      emotion: "success",
      color: "from-orange-500 to-amber-500",
      icon: "Car",
      description: "Vehicle operation and ownership",
      documents: ["driving-license"],
      fields: [
        { name: "License Number", sensitivity: "medium" },
        { name: "Vehicle Class", sensitivity: "medium" },
        { name: "Driving History", sensitivity: "medium" },
        { name: "Expiry Date", sensitivity: "low" },
      ],
      relatedReminders: ["License renewal", "Insurance update"],
      recommendation: "Required for vehicle operations and insurance",
      sensitivity: "medium",
    },
    {
      id: "property",
      label: "Property",
      emotion: "professional",
      color: "from-gray-700 to-slate-800",
      icon: "Home",
      description: "Real estate and property ownership",
      documents: ["property"],
      fields: [
        { name: "Property Address", sensitivity: "high" },
        { name: "Ownership Details", sensitivity: "high" },
        { name: "Legal Documents", sensitivity: "high" },
        { name: "Registration Number", sensitivity: "high" },
      ],
      relatedReminders: ["Property tax payment", "Document renewal"],
      recommendation: "Restrict access to legal and financial professionals",
      sensitivity: "high",
    },
    {
      id: "consent",
      label: "Access & Consent",
      emotion: "trust",
      color: "from-blue-500 to-teal-400",
      icon: "ShieldCheck",
      description: "Third-party access and sharing permissions",
      documents: [],
      fields: [
        { name: "Requester", sensitivity: "low" },
        { name: "Purpose", sensitivity: "medium" },
        { name: "Duration", sensitivity: "medium" },
        { name: "Shared Fields", sensitivity: "high" },
      ],
      relatedReminders: ["Expired access to revoke"],
      recommendation: "Review and revoke expired access regularly",
      sensitivity: "medium",
    },
    {
      id: "reminders",
      label: "Reminders",
      emotion: "reminder",
      color: "from-yellow-400 to-amber-400",
      icon: "Bell",
      description: "Action items and document renewals",
      documents: [],
      fields: [
        { name: "Task", sensitivity: "low" },
        { name: "Due Date", sensitivity: "low" },
        { name: "Priority", sensitivity: "low" },
        { name: "Associated Document", sensitivity: "medium" },
      ],
      relatedReminders: [],
      recommendation: "Set alerts to stay compliant with renewal deadlines",
      sensitivity: "low",
    },
  ],
};

/**
 * AI Summary templates
 */
export const aiSummaries = {
  identity: "This cluster contains identity-related proofs such as Aadhaar, PAN, and Passport. It is highly sensitive and should be shared only through selective field sharing with verified institutions.",
  education: "Your education records document academic achievements from 10th standard through graduation. Safe to share with employers and educational institutions for verification.",
  health: "Medical records including vaccination status and health insurance. Highly sensitive - share only with authorized healthcare providers and when absolutely necessary.",
  family: "Family relationship records including birth certificates. Highly sensitive - restrict sharing to family members and official institutions handling legal matters.",
  finance: "Financial identification documents including tax information. Share selectively with banks, government agencies, and licensed financial advisors.",
  vehicle: "Driving privileges and vehicle operation documents. Required for travel and insurance - generally safe to share as needed.",
  property: "Real estate and property ownership records. Extremely sensitive - restrict to legal professionals and financial institutions for specific purposes.",
  consent: "Active and historical access permissions granted to third parties. Review regularly to ensure only necessary access is granted.",
  reminders: "Important dates and renewal deadlines across all document types. Stay updated to maintain compliance and avoid document expiration.",
};

/**
 * Interaction state for mindmap
 */
export const mindmapState = {
  selectedNode: null,
  expandedNodes: [],
  searchQuery: "",
  showSensitiveFields: false,
  aiSummaryVisible: false,
};
