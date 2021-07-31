import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Alert } from '@material-ui/lab';
import getCommerce from '../utils/commerce'
import Layout from '../components/Layout'
import { ImageTwoTone } from '@material-ui/icons'
import { 
  Box, 
  Card,
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Grid, 
  Link, 
  Typography,
  Slide } from '@material-ui/core'
  import { useStyles ,theme} from "../utils/styles"


export default function Home({products,commercePublicKey}) {
  console.log(products)

  const classes = useStyles();

  return (
    <Layout title="Home" commercePublicLey={commercePublicKey}>
      {
        products.length === 0 && <Alert>No Products Found</Alert>
      }
      <Grid container spacing = {1}>
        {products.map(product => (
        <Slide key={product.id} direction="up" in={true}>

          <Grid item md={3}>
          <Card>
            <Link href={`/products/${product.permalink}`}>
              <CardActionArea>
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
{/*
        <div key={product.id}>
        <Image 
        src={product.media.source} 
        alt={product.name}
        width={200} height={360}        
        />
        <p>{product.name}</p>
        <p>{product.price.formatted_with_symbol}</p>
        </div>*/}

export async function getStaticProps(){
  const commerce = getCommerce();
  const {data : products} = await commerce.products.list()
  return{
    props:{
      products,
    }
  }

}
