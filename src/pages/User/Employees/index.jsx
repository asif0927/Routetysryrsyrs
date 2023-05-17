import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Input } from 'antd';
import { getAllEmployees } from '../../../api/requests';
import { Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useBasketContext } from '../../../context/BasketContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BasicGrid = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [basket, setBasket ] = useBasketContext([]);

  useEffect(() => {
    getAllEmployees().then(data => {
      setProducts(data);
    });
  }, [products]);

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  
  const handleLike = (product) => {
    if (basket.some(item => item.id === product.id)) {
      Swal.fire('Employee already in favorites!', '', 'info');
    } else {
      setBasket(prevBasket => {
        const updatedBasket = [...prevBasket, product];
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
        return updatedBasket;
      });
      Swal.fire('Liked!', 'You liked the employee.', 'success');
    }
  };  
  


  const filteredProducts = products.filter(product => {
    const fullName = `${product.name} ${product.surname}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Input
        placeholder="Search Employee"
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: '50%', marginLeft: '30%' }}
      />
      <Grid container spacing={2} style={{ boxShadow: 'none' }}>
        {filteredProducts.map(product => (
          <Grid key={product.id} item xs={12} sm={12} md={6} lg={4}>
            <Item>
              <Card style={{ height: '350px', width: '100%' }}>
                <CardMedia
                  style={{ height: '170px', objectFit: 'contain', width: '100%' }}
                  component="img"
                  image={product.imgurl}
                  alt="Product Image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{ color: 'blue' }}>
                    <Link to={`${product.id}`} style={{ color: 'blue' }}>
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
                    <Button
                      icon={<HeartOutlined />}  key={product.id}
                      style={{
                        backgroundColor: basket.some(item => item.id === product.id) ? 'red' : 'orange'
                      }} 
                      onClick={() => handleLike(product)}
                    />
                  </div>
                </CardContent>
              </Card>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BasicGrid;

