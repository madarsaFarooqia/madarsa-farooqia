import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export default function CampaignCard({ campaign, t }) {
  const percentage = campaign.goal_amount
    ? Math.min((campaign.collected_amount / campaign.goal_amount) * 100, 100)
    : 0;

  const daysLeft = campaign.end_date
    ? Math.max(
      0,
      Math.ceil(
        (new Date(campaign.end_date) - new Date()) / (1000 * 60 * 60 * 24)
      )
    )
    : null;

  const isCompleted = percentage >= 100;

  const categoryColors = {
    building: "bg-secondary text-foreground border-border",
    education: "bg-secondary text-foreground border-border",
    infrastructure: "bg-secondary text-foreground border-border",
    equipment: "bg-secondary text-foreground border-border",
    scholarship: "bg-secondary text-foreground border-border",
    food_program: "bg-secondary text-foreground border-border",
    orphan_care: "bg-secondary text-foreground border-border",
    general: "bg-secondary text-foreground border-border",
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm card-hover">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
        {campaign.image_url ? (
          <img
            src={campaign.image_url}
            alt={campaign.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-primary/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {campaign.priority === "urgent" && (
            <Badge className="bg-red-500 text-white border-0 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {t('fundraising:urgent')}
            </Badge>
          )}
          {isCompleted && (
            <Badge className="bg-emerald-500 text-white border-0 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {t('fundraising:completed')}
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <Badge
            className={`${categoryColors[campaign.category] || categoryColors.general} border text-xs font-medium`}
          >
            {campaign.category?.replace(/_/g, " ")}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-playfair font-bold text-lg text-foreground mb-2 line-clamp-2">
          {campaign.title}
        </h3>
        {campaign.description && (
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {campaign.description}
          </p>
        )}

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-primary">
              ${campaign.collected_amount?.toLocaleString() || 0}
            </span>
            <span className="text-muted-foreground">
              {t('fundraising:goal')}: ${campaign.goal_amount?.toLocaleString() || 0}
            </span>
          </div>
          <Progress value={percentage} className="h-2.5" />
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span className="font-medium text-accent">
              {percentage.toFixed(0)}%
            </span>
            {daysLeft !== null && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {daysLeft} {t('fundraising:daysLeft')}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>
              {campaign.donors_count || 0} {t('fundraising:donors')}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/donate?campaign=${campaign.id}`}
          className="block w-full py-2.5 text-center text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
        >
          <Heart className="w-4 h-4 inline-block mr-2" />
          {t('fundraising:donateToThis')}
        </Link>
      </div>
    </div>
  );
}
