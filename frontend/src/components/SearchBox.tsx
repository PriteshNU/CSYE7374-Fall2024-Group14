import React, { ReactElement, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  onSearch: (query: string) => void;
};

const SearchComponent = (props: Props): ReactElement => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchHandler = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    const query: string = inputRef.current ? inputRef.current.value : "";
    props.onSearch(query);
  }, [props]);
  const { t } = useTranslation('common');

  return (
    <form>
      <label htmlFor="default-search" className="mb-1 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input
          type="search"
          ref={inputRef}
          id="default-search"
          className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={t("Search Courses...")}
        />
        <button
          type="submit"
          onClick={searchHandler}
          className="text-white absolute end-2.5 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t("Search")}
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
