import { FC, Fragment, ChangeEvent, useState } from "react";
import { IProductCategory } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "react-router-dom";
import { styles } from "../constants/styles";

interface ITabs {
  categories: IProductCategory[];
  categoryId: number;
  handleSetCategory: (id: number) => void;
}

const Tabs: FC<ITabs> = ({ categories, categoryId, handleSetCategory }): JSX.Element => {
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<number>(+(searchParams.get("category") || 1));

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(+e.target.value);
    handleSetCategory(+e.target.value);
  };

  return (
    <nav className="mb-[0.5px]" aria-label="Tabs">
      <div>
        <select
          className="block xs:hidden rounded border p-2 md:p-4 border-gray-300 [&_summary::-webkit-details-marker]:hidden w-full focus:outline-blue-700 text-gray-700 sm:text-sm"
          value={selected}
          onChange={handleChange}
        >
          <optgroup label="Categories">
            {categories.map(category => (
              <option value={category.id} key={category.updatedAt + uuidv4()}>
                {category.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <ul className="hidden xs:flex max-w-full border-b border-gray-300 text-center">
        {categories.map(({ name, id }: IProductCategory) => (
          <Fragment key={id}>
            {categoryId === id ? (
              <li className="flex-1 relative block border-e border-s border-t rounded-t border-gray-300 bg-white p-2 lg:p-4 text-[12px] lg:text-[16px] font-medium">
                <span className="absolute inset-x-0 -bottom-px h-px w-full bg-white" />
                {name}
              </li>
            ) : (
              <li
                className="flex-1 block p-2 lg:p-4 text-[12px] lg:text-[16px] font-medium text-gray-500"
                onClick={() => handleSetCategory(id)}
              >
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
