import { Suspense } from 'react';
import { getAllSubjects } from '@/actions/manage-subjects.action';
import { getAllCategories } from '@/actions/manage-categories.action';
import SubjectsTable from '@/components/modules/subjects-table/subjects-table';

export default async function SubjectsPage() {
  const [{ data: subjects }, { data: categories }] = await Promise.all([
    getAllSubjects(),
    getAllCategories(),
  ]);

  return (
    <div className="max-w-5xl mx-auto w-full py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-center">Manage Subjects</h1>
        <p className="text-sm text-muted-foreground text-center">
          Create, update, and delete Subjects
        </p>
      </div>
      <Suspense
        fallback={<div className="text-center py-12">Loading subjects...</div>}
      >
        <SubjectsTable
          subjects={subjects || []}
          categories={categories || []}
        />
      </Suspense>
    </div>
  );
}
