export type Recipient = {
  name: string;
  phone: string;
  relationship?: string;
  occasionType?: string;  // e.g., Birthday, Anniversary, Motivation, etc.
  date?: string;          // ISO date string
  time?: string;          // HH:mm
  callType?: string;      // e.g., Birthday Shout-out, Apology Call
  message?: string;       // Custom message
  specialInstructions?: string; // Optional for Plus/Corporate
  voiceNoteUrl?: string;       // Optional, Orbit
  preferredCaller?: string;    // Optional, Orbit
};
