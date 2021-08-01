import React, { Fragment, useContext } from 'react';
import { Alert } from '@material-ui/lab';
import Layout from '../components/Layout';
import { Store } from '../components/Store';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from '../utils/styles';
import { CART_RETRIEVE_SUCCESS } from '../components/constants';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router from 'next/router';
import getCommerce from '../utils/commerce';

function Cart({commercePublicKey}) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const removeFromCartHandler = async (lineItem) => {
    const commerce = getCommerce(commercePublicKey);
    const cartData = await commerce.cart.remove(lineItem.id);
    dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData.cart });
  };


  const quantityChangeHandler = async (lineItem, quantity) => {
    const commerce = getCommerce(commercePublicKey);
    const cartData = await commerce.cart.update(lineItem.id, {
      quantity,
    });
    dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData.cart });
  };

  const proceedToCheckout = () => {
    Router.push('/checkout');
  };

  return (
    <Layout commercePublicKey={commercePublicKey} title="Shopping Cart">
    {cart.loading ? (
      <CircularProgress />
    ) : cart.data.line_items.length === 0 ? (
      <Alert icon={false} severity="error">
        Cart is empty. <Link href="/">Go shopping</Link>
      </Alert>
    ) : (
      <Fragment>
        <Typography variant="h1" component="h1">
          Shopping Cart
        </Typography>
        <Slide direction="up" in={true}>
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <Grid container>
                <TableContainer>
                  <Table aria-label="Orders">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.data.line_items.map((cartItem) => (
                        <TableRow key={cartItem.name}>
                          <TableCell component="th" scope="row">
                            {cartItem.name}
                          </TableCell>
                          <TableCell align="right">
                            <Select
                              labelId="quantity-label"
                              id="quantity"
                              onChange={(e) =>
                                quantityChangeHandler(
                                  cartItem,
                                  e.target.value
                                )
                              }
                              value={cartItem.quantity}
                            >
                              {[...Array(4).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell align="right">
                            {cartItem.price.formatted_with_symbol}
                          </TableCell>

                          <TableCell align="right">
                            <IconButton 
                              onClick={() => removeFromCartHandler(cartItem)}
                              variant="contained"
                              color="secondary"
                            >
                              <DeleteIcon />
                            </IconButton >
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card className={classes.card}>
                <List>
                  <ListItem>
                    <Grid container>
                      <Typography variant="h6">
                        Subtotal: {cart.data.subtotal.formatted_with_symbol}
                      </Typography>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    {cart.data.total_items > 0 && (
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={proceedToCheckout}
                      >
                        Proceed to checkout
                      </Button>
                    )}
                  </ListItem>
                  <ListItem>
                    {cart.data.total_items > 0 && (
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={()=>Router.push('/')}
                      >
                        Continue Shopping
                      </Button>
                    )}
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Slide>
      </Fragment>
    )}
  </Layout>
  );
}

//Rendered only on the client side

export default dynamic(()=>Promise.resolve(Cart),{
  ssr: false,
})