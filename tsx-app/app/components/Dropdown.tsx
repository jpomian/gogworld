import React from 'react';

interface DropdownMenuProps {
  avatarsPerPage: number;
  pageSettings: number[];
  onDropdownChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  avatarsPerPage,
  pageSettings,
  onDropdownChange,
}) => {
  return (
    <div className="flex justify-end items-center space-x-2">
      <label htmlFor="avatarsPerPage" className="text-foreground">
        Avatars per page:
      </label>
      <select
        id="avatarsPerPage"
        value={avatarsPerPage}
        onChange={onDropdownChange}
        className="bg-background text-foreground border border-foreground/20 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-colors"
      >
        {pageSettings.map((value) => (
          <option
            key={value}
            className="bg-background text-foreground"
            value={value}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownMenu;

