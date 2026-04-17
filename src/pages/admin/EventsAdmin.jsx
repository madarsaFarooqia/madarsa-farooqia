import EntityManager from '../../components/admin/EntityManager';

const fields = [
  { name: 'title', label: 'Title', type: 'text', placeholder: 'Event title' },
  { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Event details...' },
  { name: 'date', label: 'Date', type: 'date' },
  { name: 'type', label: 'Type', type: 'select', options: ['Religious', 'Competition', 'Community', 'Graduation', 'Workshop'] },
  { name: 'image_url', label: 'Image URL', type: 'text', placeholder: 'https://...' },
  { name: 'location', label: 'Location', type: 'text', placeholder: 'Event venue' },
  { name: 'is_upcoming', label: 'Mark as Upcoming', type: 'boolean', default: false },
];

export default function EventsAdmin() {
  return <EntityManager entityName="Event" title="Event" fields={fields} displayField="title" sortField="-date" />;
}