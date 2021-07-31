import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { Alert } from '@material-ui/lab';
import getCommerce from '../../utils/commerce'
import Layout from '../../components/Layout'
import { Image, ImageTwoTone } from '@material-ui/icons'
import { 
  Box, 
  Card, 
  Grid, 
  Link, 
  Typography,
  Slide, 
  List,
  ListItem,
  Select,
  MenuItem,
  Button} from '@material-ui/core'
  import { useStyles} from "../../utils/styles"
  import { Fragment,useState } from 'react';


export default function Product({product,commercePublicKey}) {

  console.log(product);
  const [quantity,setQuantity] = useState(1);

  const addToCartHandler=async()=>{
      console.log('Todo: Add to cart')
  }
  const classes = useStyles();
  return (
    <Layout
    
    title={product.name}
    commercePublicKey={commercePublicKey}
  >
    <Slide key={product.name} direction="up" in={true} justifyContent="center">
      <Grid container spacing={1}>
        <Grid item md={6}>
          <img
            src={product.media.source}
            alt={product.name}
            className={classes.largeImage}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography
                gutterBottom
                variant="h6"
                color="textPrimary"
                component="h1"
              >
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Box
                dangerouslySetInnerHTML={{ __html: product.description }}
              >
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    Price
                  </Grid>
                  <Grid item xs={6}>
                    {product.price.formatted_with_symbol}
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid alignItems="center" container>
                  <Grid item xs={6}>
                    Status
                  </Grid>
                  <Grid item xs={6}>
                    {product.inventory.available > 0 ? (
                      <Alert icon={false} severity="success">
                        In Stock
                      </Alert>
                    ) : (
                      <Alert icon={false} severity="error">
                        Unavailable
                      </Alert>
                    )}
                  </Grid>
                </Grid>
              </ListItem>
              {product.inventory.available > 0 && (
                <Fragment>
                  <ListItem>
                    <Grid container justifyContent="flex-end">
                      <Grid item xs={6}>
                        Quantity
                      </Grid>
                      <Grid item xs={6}>
                        <Select
                          labelId="quantity-label"
                          id="quantity"
                          fullWidth
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        >
                          {[...Array(product.inventory.available).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </ListItem>
                </Fragment>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Slide>
  </Layout>
  )
}
       

export async function getServerSideProps({params}){
    const {id} = params
  const commerce = getCommerce();
  const product  = await commerce.products.retrieve(id,{
      type:'permalink'
  })
  return{
    props:{
      product,
    }
  }

}
