import EntityManager from '../../components/admin/EntityManager';

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Full name' },
  { name: 'photo_url', label: 'Photo URL', type: 'text', placeholder: 'https://...' },
  { name: 'course', label: 'Course', type: 'select', options: ['Hifz', 'Alim', 'Primary', 'Tajweed', 'Arabic'] },
  { name: 'achievements', label: 'Achievements', type: 'textarea', placeholder: 'Notable achievements...' },
  { name: 'milestone', label: 'Milestone', type: 'text', placeholder: 'e.g., Completed 10 Juz' },
  { name: 'year_enrolled', label: 'Year Enrolled', type: 'number', placeholder: '2024' },
  { name: 'is_featured', label: 'Featured Student', type: 'boolean', default: false },
  { name: 'status', label: 'Status', type: 'select', options: ['active', 'graduated', 'alumni'], default: 'active' },
];

export default function StudentsAdmin() {
  return <EntityManager entityName="Student" title="Student" fields={fields} displayField="name" />;
}