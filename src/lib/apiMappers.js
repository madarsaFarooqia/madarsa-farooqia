/** Map backend camelCase API models to frontend snake_case fields. */

export function mapScholarToTeacher(scholar) {
  if (!scholar) return scholar;
  return {
    id: scholar.id,
    name: scholar.name,
    title: scholar.title,
    specialization: scholar.specialization,
    subjects: scholar.subjects || [],
    photo_url: scholar.imageUrl || scholar.image_url || '',
    years_experience: scholar.experienceYears ?? scholar.years_experience,
    is_active: scholar.isActive ?? scholar.is_active ?? true,
    branch_id: scholar.branchId ?? scholar.branch_id,
    created_date: scholar.createdAt ?? scholar.created_date,
  };
}

export function mapTeacherToScholar(teacher) {
  if (!teacher) return teacher;
  return {
    name: teacher.name,
    title: teacher.title,
    specialization: teacher.specialization,
    subjects: teacher.subjects,
    imageUrl: teacher.photo_url || teacher.imageUrl,
    experienceYears: teacher.years_experience ?? teacher.experienceYears,
    isActive: teacher.is_active ?? teacher.isActive,
    branchId: teacher.branch_id ?? teacher.branchId,
  };
}

export function mapCampaignFromApi(campaign) {
  if (!campaign) return campaign;
  const goal = campaign.goalAmount ?? campaign.goal_amount ?? 0;
  const raised = campaign.raisedAmount ?? campaign.collected_amount ?? campaign.raised_amount ?? 0;
  const donors = campaign.donorCount ?? campaign.donors_count ?? 0;
  return {
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    urgency_label: campaign.urgencyLabel ?? campaign.urgency_label,
    goal_amount: Number(goal),
    collected_amount: Number(raised),
    raised_amount: Number(raised),
    donors_count: Number(donors),
    percentage: campaign.percentage ?? (goal ? Math.min((raised / goal) * 100, 100) : 0),
    branch_id: campaign.branchId ?? campaign.branch_id,
    status: campaign.status,
    category: campaign.category || campaign.urgencyLabel || 'general',
    image_url: campaign.imageUrl ?? campaign.image_url ?? '',
    end_date: campaign.endDate ?? campaign.end_date,
    created_date: campaign.createdAt ?? campaign.created_date,
  };
}

export function mapCampaignToApi(campaign) {
  if (!campaign) return campaign;
  return {
    title: campaign.title,
    description: campaign.description,
    urgencyLabel: campaign.urgency_label ?? campaign.urgencyLabel,
    goalAmount: campaign.goal_amount ?? campaign.goalAmount,
    branchId: campaign.branch_id ?? campaign.branchId,
    status: campaign.status,
  };
}

export function mapStudentFromApi(student) {
  if (!student) return student;
  const name = student.name
    || [student.firstName, student.lastName].filter(Boolean).join(' ').trim();
  return {
    id: student.id,
    name,
    first_name: student.firstName ?? student.first_name,
    last_name: student.lastName ?? student.last_name,
    enrollment_number: student.enrollmentNumber ?? student.enrollment_number,
    grade: student.grade,
    course: student.course || student.grade,
    photo_url: student.photoUrl ?? student.photo_url ?? '',
    achievements: student.achievements,
    milestone: student.milestone,
    year_enrolled: student.yearEnrolled ?? student.year_enrolled,
    is_featured: student.isFeatured ?? student.is_featured ?? false,
    is_active: student.isActive ?? student.is_active ?? true,
    status: student.status || (student.isActive === false ? 'inactive' : 'active'),
    created_date: student.createdAt ?? student.created_date,
  };
}

export function mapEventFromApi(event) {
  if (!event) return event;
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date ?? event.eventDate,
    type: event.type,
    image_url: event.imageUrl ?? event.image_url ?? '',
    location: event.location,
    is_upcoming: event.isUpcoming ?? event.is_upcoming,
    created_date: event.createdAt ?? event.created_date,
  };
}

export function mapEventToApi(event) {
  return {
    title: event.title,
    description: event.description,
    date: event.date,
    type: event.type,
    imageUrl: event.image_url ?? event.imageUrl,
    location: event.location,
    isUpcoming: event.is_upcoming ?? event.isUpcoming,
  };
}

export function mapRegistrationFromApi(reg) {
  if (!reg) return reg;
  return {
    id: reg.id,
    full_name: reg.fullName ?? reg.full_name,
    email: reg.email,
    phone: reg.phone,
    course: reg.course,
    message: reg.message,
    status: reg.status,
    created_date: reg.createdAt ?? reg.created_date,
  };
}

export function mapRegistrationToApi(reg) {
  return {
    fullName: reg.full_name ?? reg.fullName,
    email: reg.email,
    phone: reg.phone,
    course: reg.course,
    message: reg.message,
    status: reg.status,
  };
}

export function mapContactFromApi(msg) {
  if (!msg) return msg;
  return {
    id: msg.id,
    name: msg.name,
    email: msg.email,
    phone: msg.phone,
    subject: msg.subject,
    message: msg.message,
    created_date: msg.createdAt ?? msg.created_date,
  };
}

export function mapDonationFromApi(donation) {
  if (!donation) return donation;
  const receiptNumber = donation.receiptNumber ?? donation.receipt_number;
  return {
    id: donation.id,
    campaign_id: donation.campaignId ?? donation.campaign_id,
    amount: donation.amount != null ? Number(donation.amount) : donation.amount,
    currency: donation.currency,
    status: donation.status,
    transaction_id: donation.transactionId ?? donation.transaction_id,
    receipt_number: receiptNumber,
    receipt_id: receiptNumber ?? donation.receipt_id,
    checkout_url: donation.checkoutUrl ?? donation.checkout_url,
    completed_at: donation.completedAt ?? donation.completed_at,
    created_date: donation.completedAt ?? donation.createdAt ?? donation.created_date,
    donor_email: donation.donorEmail ?? donation.donor_email,
    donor_name: donation.donorName ?? donation.donor_name,
    purpose: donation.purpose,
  };
}

export function mapUserFromAuth(data) {
  if (!data) return null;
  const first = data.firstName ?? data.first_name ?? '';
  const last = data.lastName ?? data.last_name ?? '';
  return {
    id: data.id,
    email: data.email,
    first_name: first,
    last_name: last,
    full_name: data.fullName ?? data.full_name ?? `${first} ${last}`.trim(),
    role: data.role,
    preferred_language: data.preferredLanguage ?? data.preferred_language,
    phone_number: data.phoneNumber ?? data.phone_number,
  };
}

export function mapQuoteFromApi(quote) {
  if (!quote) return quote;
  return {
    id: quote.id,
    arabic_text: quote.arabicText ?? quote.arabic_text,
    translation: quote.translation,
    source: quote.source,
    type: quote.type,
  };
}

export function mapInstitutionFromApi(inst) {
  if (!inst) return inst;
  return {
    id: inst.id,
    name: inst.name,
    type: inst.type,
    established_year: inst.establishedYear ?? inst.established_year,
    description: inst.description,
    cta_link: inst.ctaLink ?? inst.cta_link,
  };
}
