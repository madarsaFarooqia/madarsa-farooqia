import EntityManager from '../../components/admin/EntityManager';

const fields = [
  { name: 'title', label: 'Title', type: 'text', placeholder: 'Campaign title' },
  { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Campaign details...' },
  { name: 'target_amount', label: 'Target Amount ($)', type: 'number', placeholder: '10000' },
  { name: 'raised_amount', label: 'Amount Raised ($)', type: 'number', placeholder: '0', default: 0 },
  { name: 'deadline', label: 'Deadline', type: 'date' },
  { name: 'category', label: 'Category', type: 'select', options: ['Infrastructure', 'Scholarships', 'Teacher Salaries', 'Operations', 'Ramadan', 'General'] },
  { name: 'image_url', label: 'Image URL', type: 'text', placeholder: 'https://...' },
  { name: 'is_active', label: 'Active', type: 'boolean', default: true },
];

export default function CampaignsAdmin() {
  return <EntityManager entityName="Campaign" title="Campaign" fields={fields} displayField="title" />;
}