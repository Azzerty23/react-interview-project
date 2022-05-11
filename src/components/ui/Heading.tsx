import React from 'react';
import { PencilIcon } from '@heroicons/react/outline';

type HeadingProps = {
  title: string;
  tabs?: React.ReactNode;
  onEdit?: () => void;
};

const Heading = ({ title, tabs, onEdit }: HeadingProps) => {
  return (
    <div className="flex justify-between border-b border-gray-200">
      <div className="sm:flex sm:items-baseline">
        <h1 className="text-lg font-medium leading-6 text-gray-900">{title}</h1>
        {tabs}
      </div>
      {onEdit && (
        <button
          onClick={() => onEdit()}
          className="group mb-1 flex h-7 w-7 items-center justify-center rounded-full border hover:border-primary-400"
        >
          <PencilIcon className=" h-5 w-5 p-px text-gray-800 group-hover:text-primary-600" />
        </button>
      )}
    </div>
  );
};

export default Heading;
