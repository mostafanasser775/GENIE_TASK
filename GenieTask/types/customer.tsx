export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: "active" | "inactive";
    joinDate: string;
    company: string;
    address: string;
    notes: string;
  }
  