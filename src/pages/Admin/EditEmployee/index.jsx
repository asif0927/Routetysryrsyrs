import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeesByID, putEmployees } from '../../../api/requests';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { Select, Input, Button } from 'antd';
import style from './index.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(5, 'Name must be at least 5 characters long'),
  surname: Yup.string()
    .required('Surname is required')
    .min(6, 'Surname must be at least 6 characters long'),
  age: Yup.number()
    .integer('Age must be an integer')
    .positive('Age must be a positive number')
    .required('Age is required'),
  salary: Yup.number()
    .positive('Salary must be a positive number')
    .max(2500, 'Salary cannot be more than 2500 manats')
    .required('Salary is required'),
  position: Yup.string()
    .oneOf(['developer', 'designer', 'supervisor', 'manager', 'engineer'], 'Invalid job type')
    .required('Position is required'),
});

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    age: '',
    imgurl: '',
    salary: '',
    position: '',
    surname: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getEmployeesByID(id).then((data) => {
      setEmployee(data);
    });
  }, [id]);

  const formik = useFormik({
    initialValues: employee,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await putEmployees(id, values);
      setEmployee({
        name: '',
        age: '',
        imgurl: '',
        salary: '',
        position: '',
        surname: '',
      });
      navigate('/admin');
      handleUpdated();
    },
  });

  const handlePositionChange = (value) => {
    formik.setFieldValue('position', value);
  };

  const handleUpdated = () => {
    Swal.fire('Has been updated!', 'Has been updated.', 'success');
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <Input
          className={`${style.input} ${formik.errors.name && formik.touched.name ? style.error : ''}`}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Employee name"
          name="name"
          type="text"
        />
        {formik.errors.name && formik.touched.name && <div className={style.error}>{formik.errors.name}</div>}

        <Input
          className={`${style.input} ${formik.errors.surname && formik.touched.surname ? style.error : ''}`}
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
          className={`${style.input} ${formik.errors.imgurl && formik.touched.imgurl ? style.error : ''}`}
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

export default EditEmployee;

