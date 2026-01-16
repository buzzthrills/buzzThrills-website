import { motion, AnimatePresence } from "framer-motion";
import NewsLetterBox from "./NewsLetterBos";

const NewsletterModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Close on backdrop click */}
          <div
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl mx-4"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white text-black font-bold shadow-lg"
            >
              ✕
            </button>

            <NewsLetterBox />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;
