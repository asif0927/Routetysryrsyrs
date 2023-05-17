import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getEmployeesByID } from '../../../api/requests';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button} from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const EmployeesDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    age: '',
    salary: '',
    position: '',
    id: '',
    imgurl: '',
  });

  useEffect(() => {
    getEmployeesByID(id).then(data => {
      setProduct(data);
    })
  }, [id]);
  const handleLike = () => {
    Swal.fire('Liked!', 'You liked the employee.', 'success');
  };


  return (
    <>
      <Link to="/employees" style={{display:"flex",justifyContent:"center"}}>
        <button style={{display:"flex",justifyContent:"center" ,alignItems:"center",backgroundColor:"blue",color:"white",padding:"10px 20px",borderRadius:"15PX",cursor:"pointer"}}>go back</button>
      </Link>
      <Card style={{ height: '350px', width: 'auto',marginLeft:"30%",marginRight:"30%"}}>
        <CardMedia
          style={{ height: '170px', objectFit: 'contain', width: '100%' }}
          component="img"
          image={product.imgurl}
          alt="Product Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{ color: 'blue' }}>
            <Link to={`${product.name} ${product.surname}`}>
              {`${product.name} ${product.surname}`}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age: {product.age}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Salary: {product.salary}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Position: {product.position}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button icon={<HeartOutlined />} style={{ backgroundColor: 'orange' }} onClick={handleLike} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EmployeesDetail;
