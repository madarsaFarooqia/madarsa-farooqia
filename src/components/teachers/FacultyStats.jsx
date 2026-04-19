import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Users, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "85+", label: "Active Scholars" },
  { icon: BookOpen, value: "12", label: "Subjects Taught" },
  { icon: Clock, value: "18 yrs", label: "Avg. Experience" },
  { icon: Award, value: "40+", label: "Ijazah Holders" },
];

export default function FacultyStats() {
  return (
    <section className="bg-card border-b border-border py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <div className="font-playfair font-bold text-xl text-foreground leading-none">
                  {value}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
