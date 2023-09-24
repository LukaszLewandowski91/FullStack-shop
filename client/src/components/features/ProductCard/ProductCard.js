import {
  Grid,
  Card,
  CardMedia,
  CardActions,
  Divider,
  Tooltip,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
const ProductCard = ({ ...product }) => {
  <Grid item xs={12} sm={6} md={3}>
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        alt=""
        height="140"
        image="https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/06/lizard-iguana-1296x728-header.jpg?w=1155&h=1528"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lorem Ipsum
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'right' }}>
        <Tooltip title="Add to cart">
          <IconButton aria-label="add to cart">
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Read more">
          <IconButton aria-label="read more">
            <ReadMoreIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  </Grid>;
};

export default ProductCard;
