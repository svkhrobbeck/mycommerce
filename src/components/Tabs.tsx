import { FC, Fragment } from "react";
import { IProductCategory } from "../interfaces";

interface ITabs {
  categories: IProductCategory[];
  categoryId: number;
  handleSetCategory: (id: number) => void;
}

const Tabs: FC<ITabs> = ({ categories, categoryId, handleSetCategory }): JSX.Element => {
  return (
    <nav aria-label="Tabs">
      <ul className="max-w-full overflow-x-auto md:overflow-x-visible flex border-b border-gray-200 text-center">
        {categories.map(({ name, id }: IProductCategory) => (
          <Fragment key={id}>
            {categoryId === id ? (
              <li className="flex-1 relative block border-e border-s border-t border-gray-200 bg-white p-2 lg:p-4 text-[12px] lg:text-[16px] font-medium">
                <span className="absolute inset-x-0 -bottom-px h-px w-full bg-white" />
                {name}
              </li>
            ) : (
              <li className="flex-1 block p-2 lg:p-4 text-sm font-medium text-gray-500" onClick={() => handleSetCategory(id)}>
                {name}
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
