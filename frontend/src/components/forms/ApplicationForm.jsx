import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Hourglass } from "react-loader-spinner";

const statusOptions = [
  { value: "Applied", label: "Applied" },
  { value: "Applied Referral", label: "Applied Referral" },
  { value: "Assignment", label: "Assignment" },
  { value: "Interviewing", label: "Interviewing" },
  { value: "Selected", label: "Selected" },
  { value: "Rejected", label: "Rejected" },
];

const ApplicationForm = ({ setTemp, setForm }) => {
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const addApplication = async (data) => {
    setUploading(true);
    const config = {
      url: `${import.meta.env.VITE_BACKEND_URL}/application/add`,
      method: "post",
      withCredentials: true,
      data: data,
    };
    axios(config)
      .then(() => {
        setSuccess(true);
        setTemp((p) => p + 1);
        setTimeout(() => {
          setForm(false);
        }, 1500);
      })
      .catch((e) => console.error(e))
      .finally(() => setUploading(false));
  };
  const setTodayDate = () => {
    const today = new Date().toISOString().split("T")[0];
    setValue("dateApplied", today);
  };

  const validateDate = (value) => {
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const selectedDate = new Date(value);
    return (
      (selectedDate >= oneYearAgo && selectedDate <= today) ||
      "Date must be within the last year and not in the future"
    );
  };

  const onSubmit = (data) => {
    console.log(data);
    addApplication(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-2 md:mx-16  p-6 bg-sky-100 shadow-md rounded-md mt-4"
    >
      <div className="mb-4 ">
        <div className="md:flex items-center">
          <label
            htmlFor="companyName"
            className="block text-gray-700 font-bold mb-2  md:w-2/5"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            {...register("companyName", {
              required: "Company name is required",
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-500 ${
              errors.companyName ? "border-red-500" : ""
            }`}
          />
        </div>
      </div>

      <div className="mb-4 md:flex items-center">
        <label
          htmlFor="jobRole"
          className="block text-gray-700 font-bold mb-2 md:w-2/5"
        >
          Job Role
        </label>
        <input
          type="text"
          id="jobRole"
          {...register("jobRole", { required: "Job role is required" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-500 ${
            errors.jobRole ? "border-red-500" : ""
          }`}
        />
      </div>

      <div className="mb-4 md:flex items-center">
        <label
          htmlFor="platform"
          className="block text-gray-700 font-bold mb-2 md:w-2/5"
        >
          Platform
        </label>
        <input
          type="text"
          id="platform"
          {...register("platform", { required: "Platform is required" })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-blue-500 ${
            errors.platform ? "border-red-500" : ""
          }`}
        />
      </div>

      {errors.dateApplied && (
        <p className="text-red-500 text-sm mt-1 flex justify-end">
          {errors.dateApplied.message}
        </p>
      )}
      <div className="mb-4 md:flex items-center">
        <label
          htmlFor="dateApplied"
          className="block text-gray-700 font-bold mb-2 md:w-2/5"
        >
          Date Applied
        </label>

        <div className="flex w-full">
          <input
            type="date"
            id="dateApplied"
            {...register("dateApplied", {
              required: "Date applied is required",
              validate: validateDate,
            })}
            className={`shadow appearance-none border rounded-l w-full px-3 py-2 text-gray-700 focus:outline-blue-500 ${
              errors.dateApplied ? "border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={setTodayDate}
            className="bg-[#003461] shadow text-white px-3 py-1 rounded-r font-medium"
          >
            Today
          </button>
        </div>
      </div>

      <div className="mb-4 md:flex items-center">
        <label
          htmlFor="status"
          className="block text-gray-700 font-bold mb-2 md:w-2/5"
        >
          Status
        </label>
        <select
          id="status"
          {...register("status", { required: "Status is required" })}
          className={`shadow appearance-none border rounded w-full px-3 py-2 text-gray-700  focus:outline-blue-500 ${
            errors.status ? "border-red-500" : ""
          }`}
        >
          <option value="">Select a status</option>
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {(errors.companyName ||
        errors.jobRole ||
        errors.platform ||
        errors.status ||
        errors.dateApplied) && (
        <div className="text-red-500 text-sm text-center my-2">
          Please fill all the details
        </div>
      )}
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="px-4 py-2 font-medium text-white bg-[#003461] hover:bg-[#0055A0] rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-2 w-fit block mx-auto duration-100"
        >
          Add
        </button>
      </div>

      {uploading && (
        <div className="flex items-center gap-2 mt-4 justify-center">
          <span className="text-md font-semibold">Uploading Application</span>
          <Hourglass
            visible={true}
            height="25"
            width="25"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      )}

      {success && (
        <p className="text-green-500 font-semibold text-center mt-4">
          Application added successfully!{" "}
        </p>
      )}
    </form>
  );
};

export default ApplicationForm;