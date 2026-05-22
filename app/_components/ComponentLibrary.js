import { useState } from 'react';

const components = [
  {
    id: 'container',
    name: 'Container',
    icon: '📦',
    category: 'layout',
    props: {
      className: 'p-4 border rounded',
      children: []
    }
  },
  {
    id: 'button',
    name: 'Button',
    icon: '🔘',
    category: 'inputs',
    props: {
      className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
      children: 'Click me',
      onClick: () => alert('Button clicked!')
    }
  },
  {
    id: 'input',
    name: 'Input',
    icon: '📝',
    category: 'inputs',
    props: {
      className: 'border p-2 rounded w-full',
      placeholder: 'Enter text...',
      type: 'text'
    }
  },
  {
    id: 'heading',
    name: 'Heading',
    icon: '📋',
    category: 'text',
    props: {
      className: 'text-2xl font-bold mb-4',
      children: 'Heading'
    }
  },
  {
    id: 'paragraph',
    name: 'Paragraph',
    icon: '📄',
    category: 'text',
    props: {
      className: 'text-gray-600 mb-4',
      children: 'This is a paragraph of text.'
    }
  },
  {
    id: 'image',
    name: 'Image',
    icon: '🖼️',
    category: 'media',
    props: {
      className: 'w-full h-48 object-cover rounded',
      src: 'https://via.placeholder.com/400x300',
      alt: 'Image'
    }
  }
];

export default function ComponentLibrary({ onAddComponent }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['all', ...Array.from(new Set(components.map(c => c.category)))];

  const filteredComponents = selectedCategory === 'all' 
    ? components 
    : components.filter(c => c.category === selectedCategory);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Component Library</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-xs rounded 
                ${selectedCategory === category 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-700'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        {filteredComponents.map(comp => (
          <div 
            key={comp.id} 
            className="cursor-move p-2 border rounded hover:bg-gray-50 transition-colors drag-active:bg-indigo-50"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('application/json', JSON.stringify({
                type: 'component',
                data: comp
              }));
            }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">{comp.icon}</span>
              <span className="font-medium">{comp.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}