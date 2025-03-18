// CustomBadgeExample.tsx
import React from 'react';
import Badge from '../../lib/components/Badge/Badge.tsx';

const BadgeComponentTest: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        padding: '20px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <h3>Predefined Variants</h3>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <Badge text="Primary" variant="primary" />
        <Badge text="Secondary" variant="secondary" />
        <Badge text="Success" variant="success" />
        <Badge text="Danger" variant="danger" />
      </div>

      <h3>Custom Styling Examples</h3>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          width: '100%',
        }}
      >
        {/* Custom colors */}
        <Badge
          text="Custom Purple"
          variant="custom"
          customStyles={{
            backgroundColor: '#8b5cf6',
            textColor: 'white',
          }}
        />

        {/* Custom gradient */}
        <Badge
          text="Gradient"
          variant="custom"
          customStyles={{
            textColor: 'white',
          }}
          style={{
            backgroundImage: 'linear-gradient(to right, #ec4899, #8b5cf6)',
          }}
        />

        {/* Custom hover effects */}
        <Badge
          text="Hover Me"
          variant="custom"
          onClick={() => {}}
          customStyles={{
            backgroundColor: '#10b981',
            textColor: 'white',
            hoverBackgroundColor: 'white',
            hoverTextColor: '#10b981',
            hoverBorderColor: '#10b981',
            borderWidth: '1px',
            transition: 'all 0.3s ease',
          }}
        />

        {/* Custom hover with shadow */}
        <Badge
          text="Hover Shadow"
          variant="custom"
          onClick={() => {}}
          customStyles={{
            backgroundColor: '#3b82f6',
            textColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            // hoverBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            hoverOpacity: 0.9,
          }}
        />

        {/* Custom border */}
        <Badge
          text="Custom Border"
          variant="custom"
          customStyles={{
            backgroundColor: 'white',
            textColor: '#3b82f6',
            borderColor: '#3b82f6',
            borderWidth: '2px',
          }}
        />

        {/* Transparent with shadow */}
        <Badge
          text="With Shadow"
          variant="custom"
          customStyles={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            textColor: '#6b7280',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        />

        {/* Custom text styling */}
        <Badge
          text="CUSTOM TEXT"
          variant="custom"
          customStyles={{
            backgroundColor: 'black',
            textColor: 'white',
            letterSpacing: '1px',
            fontWeight: 700,
          }}
        />

        {/* Brand color example */}
        <Badge
          text="Brand Color"
          variant="custom"
          rounded
          customStyles={{
            backgroundColor: '#ff5722', // Example brand color
            textColor: 'white',
            hoverOpacity: 0.9,
          }}
          onClick={() => {}}
        />

        {/* Outlined with custom colors */}
        <Badge
          text="Custom Outlined"
          variant="custom"
          customStyles={{
            backgroundColor: 'transparent',
            textColor: '#8b5cf6',
            borderColor: '#8b5cf6',
            borderWidth: '1px',
            hoverBackgroundColor: '#8b5cf6',
            hoverTextColor: 'white',
          }}
          onClick={() => {}}
        />
      </div>

      {/* Theme-aware example */}
      <div style={{ marginTop: '20px', width: '100%' }}>
        <h3>Theme-Aware Example</h3>
        <p>These would pick up colors from your theme system:</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Badge
            text="Theme Primary"
            style={{
              backgroundColor: 'var(--color-primary, #3b82f6)',
              color: 'var(--color-primary-contrast, white)',
            }}
            variant="custom"
          />
        </div>
      </div>
    </div>
  );
};

export default BadgeComponentTest;
