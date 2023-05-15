import { useState, useEffect } from "react";
import { Alert } from "flowbite-react";
import React from "react";
import axios from "axios";

export default function ConfirmCompanyDelete({
  showAlert,
  setShowAlert,
  companyId,
  setChange,
}) {
  const handleCompanyDelete = (ev) => {
    axios.post("/delete_company", { companyId }).then(({ data }) => {
      setChange(true);
      setShowAlert(false)
    });
  };
  useEffect(() => {
    setChange(false);
  });
  return (
    <Alert
      color="red"
      additionalContent={
        <React.Fragment>
          <div className="mt-2 mb-4 text-sm text-red-700 dark:text-red-800">
            This action will permanently delete this user from the database. Are
            you sure you want to continue? (Note you will need to refresh this
            table)
          </div>
          <div className="flex">
            <button
              type="button"
              className="mr-2 inline-flex items-center rounded-lg bg-red-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900"
              onClick={handleCompanyDelete}
            >
              Confirm
            </button>
            <button
              type="button"
              className="rounded-lg border border-red-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-blue-300 dark:border-blue-800 dark:text-red-800 dark:hover:text-white"
              onClick={(ev) => setShowAlert(false)}
            >
              Cancel
            </button>
          </div>
        </React.Fragment>
      }
    >
      <div className="flex gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>

        <h3 className="text-lg font-medium text-red-700 dark:text-red-800">
          Warning!
        </h3>
      </div>
    </Alert>
  );
}
