import { useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaCommentDots } from "react-icons/fa";

const PHONE_NUMBER = "09059388005";
const WHATSAPP_NUMBER = "2349059388005"; // Nigeria format (no leading 0)

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ACTION BUTTONS */}
      {open && (
        <>
          {/* CALL */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            <FaPhoneAlt />
            Call
          </a>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
        </>
      )}

      {/* MAIN FLOATING BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl hover:scale-110 transition"
      >
        <FaCommentDots size={22} />
      </button>
    </div>
  );
}
