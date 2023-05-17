import { Table, Button,Input} from 'antd';
import { useBasketContext } from '../../../context/BasketContext';
import { useEffect,useState } from 'react';

const FavoritesPage = () => {
  const [basket, setBasket] = useBasketContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (id) => {
    setBasket(prevBasket => prevBasket.filter(item => item.id !== id));
    localStorage.setItem("basket", JSON.stringify(basket));
  };

  useEffect(()=>{
    const storedata=JSON.parse(localStorage.getItem("basket")) || [];
    setBasket(storedata)
  },[])

  const handleClear=()=>{
    /*localStorage.removeItem("basket");*/
    setBasket([]);
  }

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees=basket.filter(item=>{
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  })


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Age',
      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Position',
      dataIndex: 'position',
    },
    {
      title: 'Image',
      dataIndex: 'imgurl',
      render: (imgurl) => <img src={imgurl} alt="Employee" style={{ width: "100px", height: "100px" }} />,
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      render: (id) => (
        <Button type="primary" danger onClick={() => handleDelete(id)} >
          Delete
        </Button>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <>
    <Input
        placeholder="Search Employee"
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: '50%', marginLeft: '30%' }}
      />
     <Table columns={columns} dataSource={filteredEmployees} onChange={onChange} rowKey="id" style={{width:"100%"}}/>
      <Button  type="primary" danger onClick={handleClear} style={{margin:"30px auto",width:"100px",display:"flex",justifyContent:"center",alignItems:"center"}}>Clear All</Button>
    </>
  );
};

export default FavoritesPage;

