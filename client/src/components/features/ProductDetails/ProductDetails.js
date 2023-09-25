import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux';
import { useEffect } from 'react';
import NotFound from '../../pages/NotFound/NotFound';

const ProductDetails = () => {
  const { id } = useParams();

  const product = useSelector((state) => getProductById(state, id));

  return <div>{!product ? <NotFound /> : <h1>{product.id}</h1>}</div>;
};

export default ProductDetails;
