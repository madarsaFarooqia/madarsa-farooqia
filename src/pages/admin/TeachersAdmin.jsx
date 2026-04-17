import EntityManager from '../../components/admin/EntityManager';

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Full name' },
  { name: 'photo_url', label: 'Photo URL', type: 'text', placeholder: 'https://...' },
  { name: 'qualifications', label: 'Qualifications', type: 'text', placeholder: 'e.g., MA Islamic Studies' },
  { name: 'subjects', label: 'Subjects', type: 'text', placeholder: 'e.g., Quran, Hadith' },
  { name: 'biography', label: 'Biography', type: 'textarea', placeholder: 'Short bio...' },
  { name: 'ijazah', label: 'Ijazah (Academic Chain)', type: 'text', placeholder: 'Details of ijazah...' },
  { name: 'years_experience', label: 'Years of Experience', type: 'number', placeholder: '0' },
  { name: 'order', label: 'Display Order', type: 'number', placeholder: '0', default: 0 },
];

export default function TeachersAdmin() {
  return <EntityManager entityName="Teacher" title="Teacher" fields={fields} displayField="name" sortField="-order" />;
}