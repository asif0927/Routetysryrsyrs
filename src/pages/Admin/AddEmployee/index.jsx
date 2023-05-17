import React, { useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { postEmployee } from "../../../api/requests";
import Swal from "sweetalert2";
import { Select, Input, Button } from "antd";
import style from "./index.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const AddEmployee = () => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    surname: "",
    age: "",
    salary: "",
    position: "",
    imgurl: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  }

  function handlePositionChange(value) {
    setNewEmployee({ ...newEmployee, position: value });
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(5, "Name must be at least 5 characters"),
    surname: Yup.string()
      .required("Surname is required")
      .min(6, "Surname must be at least 6 characters"),
    imgurl: Yup.string().required("Url is required"),
    age: Yup.number()
      .required("Age is required")
      .integer("Age must be an integer")
      .positive("Age must be a positive number"),
    salary: Yup.number()
      .required("Salary is required")
      .positive("Salary must be a positive number")
      .max(2500, "Salary cannot be more than 2500 manats"),
    position: Yup.string()
      .oneOf(
        ["developer", "designer", "supervisor", "manager", "engineer"],
        "Invalid job type"
      )
      .required("Position is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      age: "",
      imgurl: "",
      salary: "",
      position: "",
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    newEmployee.id = nanoid();
    console.log(newEmployee);
    await postEmployee(newEmployee);
    setNewEmployee({
      name: "",
      surname: "",
      age: "",
      salary: "",
      position: "",
      imgurl: "",
    });
    navigate("/admin");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={style.form}>
        <Input
          className={`${style.input} ${
            formik.errors.name && formik.touched.name ? style.inputerror : ""
          }`}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Employee name"
          name="name"
          type="text"
        />
        {formik.errors.name && formik.touched.name && (
          <div className={style.error}>{formik.errors.name}</div>
        )}

        <Input
          className={`${style.input} ${
            formik.errors.surname && formik.touched.surname
              ? style.inputerror
              : ""
          }`}
          value={formik.values.surname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Employee surname"
          name="surname"
          type="text"
          />
          {formik.errors.surname && formik.touched.surname && (
          <div className={style.error}>{formik.errors.surname}</div>
          )}
            <Input
              className={`${style.input} ${
                formik.errors.imgurl && formik.touched.imgurl
                 ? style.inputerror
                 : ""
                }`}
                value={formik.values.imgurl}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 placeholder="Employee imgurl"
                 name="imgurl"
                 type="text"
                />
                {formik.errors.imgurl && formik.touched.imgurl && (
                  <div className={style.error}>{formik.errors.imgurl}</div>
                )}

             <Input
                className={`${style.input} ${
                  formik.errors.age && formik.touched.age ? style.inputerror : ""
                }`}
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Employee age"
                name="age"
                type="number"
              />
              {formik.errors.age && formik.touched.age && (
                 <div className={style.error}>{formik.errors.age}</div>
              )}

              <Input
                className={`${style.input} ${
                   formik.errors.salary && formik.touched.salary ? style.inputerror : ""
                }`}
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Employee salary"
                name="salary"
                type="number"
              />
              {formik.errors.salary && formik.touched.salary && (
                <div className={style.error}>{formik.errors.salary}</div>
              )}

              <Select
               value={formik.values.position}
               onChange={(value) => formik.setFieldValue("position", value)}
                name="position"
                 className={`${style.select} ${
                   formik.errors.position && formik.touched.position
                    ? style.selectError
                    : ""
                  }`}
                  onBlur={formik.handleBlur}
              >
              <Select.Option value="developer">Developer</Select.Option>
              <Select.Option value="designer">Designer</Select.Option>
              <Select.Option value="supervisor">Supervisor</Select.Option>
              <Select.Option value="manager">Manager</Select.Option>
              <Select.Option value="engineer">Engineer</Select.Option>
             </Select>
              {formik.errors.position && formik.touched.position && (
                <div className={style.error}>{formik.errors.position}</div>
              )}


            <Button
              type="primary"
              htmlType="submit"
              className={style.button}
               disabled={!formik.isValid}
            >
             Add Employee
            </Button>
  </form>
</>
);
};

export default AddEmployee;
