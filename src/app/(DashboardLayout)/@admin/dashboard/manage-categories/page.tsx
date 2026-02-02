import { getAllCategories } from '@/actions/manage-categories.action';
import CategoriesTable from '@/components/modules/categories-table/categories-table';

export const dynamic = 'force-dynamic';

const ManageCategoriesPage = async () => {
  const { data } = await getAllCategories();

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-center">
            Manage Categories
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Create, update, and delete categories
          </p>
        </div>

        <CategoriesTable categories={data ?? []} />
      </div>
    </div>
  );
};

export default ManageCategoriesPage;
