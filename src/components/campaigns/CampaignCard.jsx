import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import GeometricProgress from "./GeometricProgress";

export default function CampaignCard({ campaign, index = 0 }) {
  const raised = campaign.raised_amount || 0;
  const target = campaign.target_amount || 1;
  const pct = Math.round((raised / target) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-400"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {campaign.image_url ? (
          <img
            src={campaign.image_url}
            alt={campaign.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 ghost-geometry" />
        )}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-primary text-xs font-jakarta font-semibold px-3 py-1.5 rounded-full shadow-sm">
            {campaign.category || "Campaign"}
          </span>
        </div>
        {pct >= 100 && (
          <div className="absolute top-4 right-4">
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
              Fully Funded ✓
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-baskerville font-bold text-xl text-primary mb-2 leading-snug line-clamp-2">
          {campaign.title}
        </h3>
        <p className="font-jakarta text-sm text-muted-foreground line-clamp-2 mb-5 leading-relaxed">
          {campaign.description}
        </p>

        <GeometricProgress raised={raised} target={target} />

        <div className="mt-5 flex items-center justify-between">
          {campaign.deadline ? (
            <div className="flex items-center gap-1.5 text-xs font-jakarta text-muted-foreground">
              <Calendar size={13} />
              <span>
                Ends {format(new Date(campaign.deadline), "MMM d, yyyy")}
              </span>
            </div>
          ) : (
            <span className="text-xs font-jakarta text-muted-foreground">
              Ongoing
            </span>
          )}
          <Link
            to={`/donate?campaign=${campaign.id}`}
            className="inline-flex items-center gap-1 text-sm font-jakarta font-semibold text-primary hover:text-accent transition-colors"
          >
            Donate{" "}
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
