// import { motion } from 'framer-motion';
// import { Star } from 'lucide-react';

// export default function StudentCard({ student, index = 0 }) {
//   const initials = student.name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'S';

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.96 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true, margin: '-30px' }}
//       transition={{ duration: 0.5, delay: index * 0.04 }}
//       className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 break-inside-avoid mb-5"
//     >
//       {student.is_featured && (
//         <div className="absolute -top-2 -right-2 flex items-center gap-1 text-xs font-jakarta font-semibold px-2.5 py-1 rounded-full text-white shadow-md" style={{ backgroundColor: 'var(--solar-gold)' }}>
//           <Star size={10} className="fill-current" />
//           Featured
//         </div>
//       )}

//       <div className="flex items-start gap-4">
//         <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-primary/10 flex items-center justify-center border-2 border-primary/15">
//           {student.photo_url ? (
//             <img src={student.photo_url} alt={student.name} className="w-full h-full object-cover" />
//           ) : (
//             <span className="font-baskerville font-bold text-primary text-lg">{initials}</span>
//           )}
//         </div>
//         <div className="flex-1 min-w-0">
//           <h3 className="font-baskerville font-bold text-lg text-primary">{student.name}</h3>
//           <p className="text-xs font-jakarta uppercase tracking-wider" style={{ color: 'var(--solar-gold)' }}>
//             {student.course}
//           </p>
//         </div>
//       </div>

//       {student.milestone && (
//         <div className="mt-4 p-3 bg-muted/70 rounded-lg">
//           <p className="text-xs font-jakarta uppercase tracking-wider text-muted-foreground mb-1">Milestone</p>
//           <p className="font-baskerville text-sm text-foreground italic">"{student.milestone}"</p>
//         </div>
//       )}

//       {student.achievements && (
//         <p className="mt-3 text-sm font-jakarta text-muted-foreground leading-relaxed">
//           {student.achievements}
//         </p>
//       )}

//       {student.year_enrolled && (
//         <p className="mt-4 text-xs font-jakarta text-muted-foreground/70">
//           Enrolled · {student.year_enrolled}
//         </p>
//       )}
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function StudentCard({ student, index = 0 }) {
  const initials =
    student.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "S";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 break-inside-avoid mb-5"
    >
      {student.is_featured && (
        <div
          className="absolute -top-2 -right-2 flex items-center gap-1 text-xs font-jakarta font-semibold px-2.5 py-1 rounded-full text-white shadow-md"
          style={{ backgroundColor: "var(--solar-gold)" }}
        >
          <Star size={10} className="fill-current" />
          Featured
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-primary/10 flex items-center justify-center border-2 border-primary/15">
          {student.photo_url ? (
            <img
              src={student.photo_url}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-baskerville font-bold text-primary text-lg">
              {initials}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-baskerville font-bold text-lg text-primary">
            {student.name}
          </h3>
          <p
            className="text-xs font-jakarta uppercase tracking-wider"
            style={{ color: "var(--solar-gold)" }}
          >
            {student.course}
          </p>
        </div>
      </div>

      {student.milestone && (
        <div className="mt-4 p-3 bg-muted/70 rounded-lg">
          <p className="text-xs font-jakarta uppercase tracking-wider text-muted-foreground mb-1">
            Milestone
          </p>
          <p className="font-baskerville text-sm text-foreground italic">
            "{student.milestone}"
          </p>
        </div>
      )}

      {student.achievements && (
        <p className="mt-3 text-sm font-jakarta text-muted-foreground leading-relaxed">
          {student.achievements}
        </p>
      )}

      {student.year_enrolled && (
        <p className="mt-4 text-xs font-jakarta text-muted-foreground/70">
          Enrolled · {student.year_enrolled}
        </p>
      )}
    </motion.div>
  );
}
