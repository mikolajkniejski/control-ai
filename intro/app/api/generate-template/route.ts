import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Email template generated:", new Date().toISOString()); // Log generation

  const {
    country,
    fullName,
    address,
    selectedMep,
  }: {
    country: string;
    fullName: string;
    address: string;
    selectedMep: string;
  } = await req.json();

  // Function to get nationality adjective from country name
  const getNationality = (country: string): string => {
    const nationalityMap: Record<string, string> = {
      Austria: "Austrian",
      Belgium: "Belgian",
      Bulgaria: "Bulgarian",
      Croatia: "Croatian",
      Cyprus: "Cypriot",
      "Czech Republic": "Czech",
      Denmark: "Danish",
      Estonia: "Estonian",
      Finland: "Finnish",
      France: "French",
      Germany: "German",
      Greece: "Greek",
      Hungary: "Hungarian",
      Ireland: "Irish",
      Italy: "Italian",
      Latvia: "Latvian",
      Lithuania: "Lithuanian",
      Luxembourg: "Luxembourgish",
      Malta: "Maltese",
      Netherlands: "Dutch",
      Poland: "Polish",
      Portugal: "Portuguese",
      Romania: "Romanian",
      Slovakia: "Slovak",
      Slovenia: "Slovenian",
      Spain: "Spanish",
      Sweden: "Swedish",
    };
    return nationalityMap[country] || "European";
  };

  const nationality = getNationality(country);

  const template = `Dear ${selectedMep},

I hope this message finds you well. I am writing to you as a concerned ${nationality} citizen regarding the pressing issue of the risk of extinction from AI.

The potential extinction risk from AI, notably from developments in superintelligence, is a grave concern that top AI experts, including Nobel Prize and Turing Award recipients, have been vocal about. The warnings from these highly credentialed individuals underscore the necessity for immediate action.

As my elected representative, I urge you to support ControlAI’s campaign statement, which has already gained the support of over 60 of your parliamentary colleagues, as can be seen at controlai.com/statement. For further information, please feel free to contact their policy team at mathias@controlai.com; they have already briefed more than 100 parliamentarians on this issue.

Thank you for your attention to this matter. I look forward to seeing your leadership on this crucial issue.

Sincerely,

${fullName}
${address}`;

  // TODO: Integrate AI generation here (e.g., call OpenAI with prompt including user details)

  return NextResponse.json({ template });
}
