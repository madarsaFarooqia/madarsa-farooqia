const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Fake Campaign Data
const campaigns = [
  {
    id: 1,
    title: "Build New Classrooms",
    category: "Infrastructure",
    created_date: "2025-01-01",
  },
  {
    id: 2,
    title: "Student Scholarships",
    category: "Scholarships",
    created_date: "2025-02-10",
  },
  {
    id: 3,
    title: "Teacher Salaries Fund",
    category: "Teacher Salaries",
    created_date: "2025-03-05",
  },
];

// Fake Donations
const donations = [
  {
    id: 1,
    amount: 100,
    status: "completed",
    donor_email: "user1@test.com",
  },
  {
    id: 2,
    amount: 250,
    status: "completed",
    donor_name: "Ahmed",
  },
  {
    id: 3,
    amount: 75,
    status: "pending",
  },
];

export const donateService = {
  Campaign: {
    list: async () => {
      await delay(500);
      return campaigns;
    },
  },

  Donation: {
    filter: async (query) => {
      await delay(500);
      return donations.filter((d) =>
        query.status ? d.status === query.status : true
      );
    },
  },
};