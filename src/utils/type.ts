// types.ts
export type Recipient = {
  name: string;
  phone: string;
  relationship: string;
  occasionType: string;
  date: string;
  time: string;
  callType: string;
  message?: string;
};

export type User = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  subscription?: {
    plan: {
      name: string;
      maxCalls: number;
    };
    calls?: Recipient[];
  };
};
