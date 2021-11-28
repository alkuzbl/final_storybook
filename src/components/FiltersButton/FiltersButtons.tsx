import React from 'react';

import { v1 } from 'uuid';

export const FiltersButtons = () => {
  const filtersButton = [
    { id: v1(), label: 'All', filter: 'all' },
    { id: v1(), label: 'Active', filter: 'active' },
    { id: v1(), label: 'Completed', filter: 'completed' },
  ];
  return (
    <div>
      {filtersButton.map(f => (
        <button type="button" key={f.id}>
          {f.label}
        </button>
      ))}
    </div>
  );
};
