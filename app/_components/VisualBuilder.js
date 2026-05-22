import { useState, useEffect } from 'react';
import ComponentLibrary from './ComponentLibrary';
import { createComponent, getComponents } from '@/lib/db';

export default function VisualBuilder({ appId, userId }) {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load components from database
  useEffect(() => {
    async function loadComponents() {
      try {
        const comps = await getComponents();
        setComponents(comps);
      } catch (err) {
        setError(err.message || 'Failed to load components');
      } finally {
        setLoading(false);
      }
    }

    loadComponents();
  }, []);

  // Handle dropping a component onto the canvas
  const handleDrop = (e) => {
    e.preventDefault();
    
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (data.type === 'component') {
        const newComponent = {
          id: Date.now().toString(),
          type: data.data.id,
          props: { ...data.data.props },
          x: e.clientX,
          y: e.clientY
        };
        
        setCanvasComponents([...canvasComponents, newComponent]);
      }
    } catch (err) {
      console.error('Error parsing drop data:', err);
    }
  };

  // Handle canvas drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle component selection
  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  // Handle property change
  const handlePropertyChange = (property, value) => {
    if (selectedComponent) {
      const updatedComponents = canvasComponents.map(comp => {
        if (comp.id === selectedComponent.id) {
          return {
            ...comp,
            props: {
              ...comp.props,
              [property]: value
            }
          };
        }
        return comp;
      });
      
      setCanvasComponents(updatedComponents);
      setSelectedComponent(updatedComponents.find(c => c.id === selectedComponent.id));
    }
  };

  // Save the app design
  const saveAppDesign = async () => {
    try {
      // In a real implementation, we would save this to the app record
      // For now, we'll just log it
      console.log('Saving app design:', {
        appId,
        userId,
        components: canvasComponents,
        updatedAt: new Date().toISOString()
      });
      
      // Here you would update the app record with the design
      // await updateApp(appId, { design: canvasComponents });
      
      alert('App design saved successfully!');
    } catch (err) {
      setError(err.message || 'Failed to save app design');
    }
  };

  // Render a component based on its type
  const renderComponent = (component) => {
    switch (component.type) {
      case 'container':
        return (
          <div
            {...component.props}
            onClick={() => handleComponentSelect(component)}
            className={`border-2 border-blue-500 ${component.props.className}`}
          >
            {component.props.children.map(childId => {
              const child = canvasComponents.find(c => c.id === childId);
              return child ? renderComponent(child) : null;
            })}
          </div>
        );
      
      case 'button':
        return (
          <button
            {...component.props}
            onClick={(e) => {
              e.stopPropagation();
              component.props.onClick && component.props.onClick();
            }}
            className={`border-2 border-blue-500 ${component.props.className}`}
          >
            {component.props.children}
          </button>
        );
      
      case 'input':
        return (
          <input
            {...component.props}
            onClick={(e) => e.stopPropagation()}
            className={`border-2 border-blue-500 ${component.props.className}`}
          />
        );
      
      case 'heading':
        return (
          <h2
            {...component.props}
            onClick={() => handleComponentSelect(component)}
            className={`border-2 border-blue-500 ${component.props.className}`}
          >
            {component.props.children}
          </h2>
        );
      
      case 'paragraph':
        return (
          <p
            {...component.props}
            onClick={() => handleComponentSelect(component)}
            className={`border-2 border-blue-500 ${component.props.className}`}
          >
            {component.props.children}
          </p>
        );
      
      case 'image':
        return (
          <img
            {...component.props}
            onClick={() => handleComponentSelect(component)}
            className={`border-2 border-blue-500 ${component.props.className}`}
          />
        );
      
      default:
        return <div>Unknown component type: {component.type}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Left sidebar - Component Library */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <ComponentLibrary onAddComponent={(component) => {
            // Add component to canvas
            const newComponent = {
              id: Date.now().toString(),
              type: component.id,
              props: { ...component.props },
              x: 100,
              y: 100
            };
            setCanvasComponents([...canvasComponents, newComponent]);
          }} />
        </div>

        {/* Main content - Canvas and Properties */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 p-2">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Visual App Builder</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={saveAppDesign}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
                >
                  Save Design
                </button>
                <button 
                  onClick={() => setCanvasComponents([])}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
                >
                  Clear Canvas
                </button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div 
            className="flex-1 bg-white border-b border-gray-200 overflow-auto p-8"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="min-h-full min-w-full border-2 border-dashed border-gray-300 relative">
              {canvasComponents.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400">Drag components here to build your app</p>
                </div>
              ) : (
                <div className="p-4">
                  {canvasComponents.map(comp => (
                    <div 
                      key={comp.id}
                      className="mb-4 relative group"
                      style={{ 
                        position: 'relative',
                        left: comp.x,
                        top: comp.y
                      }}
                    >
                      {renderComponent(comp)}
                      <div 
                        className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCanvasComponents(canvasComponents.filter(c => c.id !== comp.id));
                        }}
                      >
                        ✕
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Properties Panel */}
          <div className="w-64 bg-white border-l border-gray-200 overflow-y-auto p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Properties</h3>
            
            {selectedComponent ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Component Type: <span className="font-bold">{selectedComponent.type}</span>
                  </label>
                </div>
                
                {selectedComponent.type === 'button' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                    <input
                      type="text"
                      value={selectedComponent.props.children || ''}
                      onChange={(e) => handlePropertyChange('children', e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                )}
                
                {selectedComponent.type === 'input' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                    <input
                      type="text"
                      value={selectedComponent.props.placeholder || ''}
                      onChange={(e) => handlePropertyChange('placeholder', e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                )}
                
                {['heading', 'paragraph'].includes(selectedComponent.type) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                    <textarea
                      value={selectedComponent.props.children || ''}
                      onChange={(e) => handlePropertyChange('children', e.target.value)}
                      className="w-full border p-2 rounded"
                      rows={3}
                    />
                  </div>
                )}
                
                {selectedComponent.type === 'image' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={selectedComponent.props.src || ''}
                      onChange={(e) => handlePropertyChange('src', e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CSS Class</label>
                  <input
                    type="text"
                    value={selectedComponent.props.className || ''}
                    onChange={(e) => handlePropertyChange('className', e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Select a component to edit its properties</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}