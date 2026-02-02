'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import { deleteAvailability } from '@/actions/manage-availability.action';
import { toast } from 'sonner';
import AddAvailAbilityForm from './AddAvailAbilityForm';

interface IAvailabilityDataProps {
  id: string;
  tutorId: string;
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  subject: string;
}

type Subject = {
  id: string;
  name: string;
  categoryId: string;
};

interface ManageAvailabilityTableProps {
  availabilityData: IAvailabilityDataProps[];
  subjects: Subject[];
  tutorId: string;
}

const ManageAvailabilityTable = ({
  availabilityData,
  subjects,
  tutorId,
}: ManageAvailabilityTableProps) => {
  const [editingItem, setEditingItem] = useState<IAvailabilityDataProps | null>(
    null,
  );

  const handleDelete = async (id: string) => {
    const toastId = toast.loading('Deleting...');
    const res = await deleteAvailability(id);

    if (!res.success) {
      toast.error('This slot has a booking so you cant delete it', { id: toastId });
      return;
    }
    toast.success('Deleted', { id: toastId });
  };

  const handleEditClick = (item: IAvailabilityDataProps) => {
    setEditingItem(item);
  };

  return (
    <div>
      {/* Form at the top: Add or Edit */}
      <AddAvailAbilityForm
        subjects={subjects}
        tutorId={tutorId}
        initialData={
          editingItem
            ? {
                id: editingItem.id,
                subjectId: editingItem.subjectId,
                date: editingItem.date,
                startTime: editingItem.startTime,
                endTime: editingItem.endTime,
              }
            : undefined
        }
        onSuccess={() => setEditingItem(null)}
      />

      {/* Availability cards */}
      {availabilityData.length == 0 && <p>No data found</p>}
      {availabilityData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {availabilityData.map(item => {
            const date = new Date(item.date);

            return (
              <Card
                key={item.id}
                className="w-full hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border border-gray-200"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                      {item.subject}
                    </CardTitle>
                    <Badge
                      variant={item.isBooked ? 'destructive' : 'outline'}
                      className={`text-sm px-3 py-1 font-medium ${
                        item.isBooked
                          ? 'bg-red-100 text-red-800 border-red-200'
                          : 'bg-green-100 text-green-800 border-green-200'
                      }`}
                    >
                      {item.isBooked ? 'Booked' : 'Available'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {date.toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex-1 flex items-center gap-3 text-sm text-gray-600 bg-blue-50 p-2 rounded-lg">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="font-semibold text-gray-900">
                        {item.startTime} - {item.endTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageAvailabilityTable;
