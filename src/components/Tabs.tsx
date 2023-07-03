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
    <nav className="overflow-x-auto overflow-y-hidden" aria-label="Tabs">
      <select
        className={`${styles.borderGray} block xs:hidden [&_summary::-webkit-details-marker]:hidden w-full text-gray-700 sm:text-sm p-2`}
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

      <ul className="hidden xs:flex max-w-full border-t-0 border-gray-300 text-center">
        {categories.map(({ name, id }: IProductCategory) => (
          <Fragment key={id}>
            {categoryId === id ? (
              <li className="flex-1 whitespace-nowrap cursor-pointer relative block border-e border-s border-t rounded-t border-gray-300 bg-white p-2 lg:p-4 text-[12px] lg:text-[16px] font-medium">
                <span className="absolute inset-x-0 -bottom-px h-px w-full bg-white" />
                {name}
              </li>
            ) : (
              <li
                className="flex-1 border-b whitespace-nowrap cursor-pointer block p-2 lg:p-4 text-[12px] lg:text-[16px] font-medium text-gray-500"
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
