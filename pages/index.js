import React from 'react'
import { Alert } from '@material-ui/lab';
import getCommerce from '../utils/commerce'
import Layout from '../components/Layout'
import { 
  Box, 
  Card,
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Grid, 
  Link, 
  Typography,
  Slide,
 } from '@material-ui/core'
  import { useStyles} from "../utils/styles"

export default function Home({products,commercePublicKey}) {
  console.log(products)

  const classes = useStyles();

  return (
    <Layout title="Home" commercePublicKey={commercePublicKey}>
      {
        products.length === 0 && <Alert>No Products Found</Alert>
      }
      <Grid container spacing = {1} justifyContent="center">
        {products.map(product => (
        <Slide key={product.id} direction="up" in={true}>

          <Grid item md={3} sm={6} xs={12}>
          <Card className={classes.Card}>
            <Link href={`/products/${product.permalink}`}>
              <CardActionArea display="flex" justify-content="center" align-items="center">
                <CardMedia className={classes.Media}
                  component="img"                  
                  alt={product.name}
                  image={product.media.source}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="textPrimary"
                    component="p"
                  >
                    {product.name}
                  </Typography>
                  <Box>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    >
                      {product.price.formatted_with_symbol}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
        </Slide>   
      ))}
      </Grid>
    </Layout>
  )
}
      



export async function getStaticProps(){
  const commerce = getCommerce();
  const {data : products} = await commerce.products.list()
  return{
    props:{
      products,
    }
  }

}
