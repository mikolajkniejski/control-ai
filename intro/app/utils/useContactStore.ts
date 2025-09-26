import { create } from "zustand";
import { type Country, MEPS_BY_COUNTRY } from "./meps";

interface ContactState {
  country: Country | "";
  fullName: string;
  address: string;
  selectedMep: string;
  template: string;
  mepsForCountry: string[];
  setCountry: (country: Country) => void;
  setFullName: (name: string) => void;
  setAddress: (postalCode: string) => void;
  setSelectedMep: (representative: string) => void;
  generateTemplate: () => Promise<void>;
  sendEmail: () => Promise<void>;
}

export const useContactStore = create<ContactState>((set, get) => ({
  country: "",
  fullName: "",
  address: "",
  selectedMep: "",
  template: "",
  mepsForCountry: [],
  setCountry: (country) => {
    const mepsForCountry = MEPS_BY_COUNTRY[country] || [];
    set({ country, mepsForCountry, selectedMep: "" });
  },
  setFullName: (fullName) => set({ fullName }),
  setAddress: (address) => set({ address }),
  setSelectedMep: (selectedMep) => set({ selectedMep }),
  generateTemplate: async () => {
    const { country, fullName, address, selectedMep } = get();
    if (!country || !fullName || !address || !selectedMep) return;

    const res = await fetch("/api/generate-template", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country, fullName, address, selectedMep }),
    });
    const { template } = await res.json();
    set({ template });
  },
  sendEmail: async () => {
    const { template } = get();
    if (!template) return;

    // Log send on back-end
    await fetch("/api/log-send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country: get().country,
        fullName: get().fullName,
        selectedMep: get().selectedMep,
      }),
    });

    // Open email client
    const subject = encodeURIComponent(
      "Concern about AI extinction risk from superintelligence",
    );
    const body = encodeURIComponent(template);
    window.location.href = `mailto:mathias@controlai.com?subject=${subject}&body=${body}`;
  },
}));
