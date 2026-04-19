import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const quickAmounts = [10, 25, 50, 100, 250];

export default function QuickDonateDrawer() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all"
        style={{ backgroundColor: "var(--solar-gold)" }}
        aria-label="Quick Donate"
      >
        <Heart size={22} className="fill-current" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 bg-primary text-primary-foreground ghost-geometry relative">
                <div className="relative z-10">
                  <button
                    onClick={() => setOpen(false)}
                    className="absolute top-0 right-0 p-1 text-primary-foreground/60 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--solar-gold)" }}
                    >
                      <Heart size={14} className="fill-current text-white" />
                    </div>
                    <span className="font-baskerville font-bold text-xl">
                      Sadaqah
                    </span>
                  </div>
                  <p className="font-jakarta text-primary-foreground/70 text-sm">
                    Your generosity illuminates the path of knowledge.
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                <p className="font-baskerville text-lg text-foreground mb-4">
                  Choose an amount
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {quickAmounts.map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        setAmount(a);
                        setCustom("");
                      }}
                      className={`py-3 rounded-lg text-sm font-jakarta font-semibold border transition-all ${
                        amount === a && !custom
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-primary/40 text-foreground"
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Custom"
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value);
                      setAmount(null);
                    }}
                    className="col-span-1 py-3 px-2 rounded-lg text-sm font-jakarta border border-border text-center focus:outline-none focus:border-primary bg-background"
                  />
                </div>

                <div className="bg-muted rounded-xl p-4 mb-6">
                  <p className="text-sm font-jakarta text-muted-foreground mb-1">
                    Your donation of
                  </p>
                  <p className="text-3xl font-baskerville font-bold text-primary">
                    ${custom || amount || 0}
                  </p>
                  <p className="text-sm font-jakarta text-muted-foreground mt-1">
                    can feed a student for{" "}
                    {Math.round((custom || amount || 0) / 3)} days
                  </p>
                </div>

                <Link
                  to={`/donate?amount=${custom || amount}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl text-white font-jakarta font-semibold text-base transition-all hover:opacity-90 active:scale-98"
                  style={{ backgroundColor: "var(--solar-gold)" }}
                >
                  Proceed to Donate <ChevronRight size={18} />
                </Link>

                <p className="text-center text-xs text-muted-foreground font-jakarta mt-4">
                  Secure & transparent. 100% reaches the madrasa.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
