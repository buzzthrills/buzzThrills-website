// import type { Recipient } from "../../utils/type";

import type { Recipient } from "../utils/type";

const SummaryStep = ({ recipients }: { recipients: Recipient[] }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      {recipients
        .filter((r) => r.name)
        .map((r, i) => (
          <div key={i} className="border p-2 rounded mb-2">
            {r.name} — {r.callType} — {r.date}
          </div>
        ))}
    </div>
  );
};

export default SummaryStep;
