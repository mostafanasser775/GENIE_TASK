import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { z } from "zod";
import { recivedCustomerZod } from '@/ZOD/Customer';



const Items = ({ customer}: {customer:z.infer<typeof recivedCustomerZod>}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: customer.id,
    data: {
      type: 'item',
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer',
        isDragging && 'opacity-50',
      )}
    >
      <div className="flex items-center justify-between">
        {customer.name}
        <button
          className="p-2 text-xs border shadow-lg rounded-xl hover:shadow-xl"
          {...listeners}
        >
          Drag Handle
        </button>
      </div>
    </div>
  );
};

export default Items;