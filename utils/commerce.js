import Commerce from '@chec/commerce.js';
// 
let commerce = null;

//define function to Authenticate The API Key
function getCommerce(commercePublicKey) {

  if (commerce) {
    return commerce;
  } else {
    const publicKey = commercePublicKey || process.env.REACT_APP_COMMERCE_PUBLIC_KEY;
    const devEnvironment = process.env.NODE_ENV === 'development';
    if (devEnvironment && !publicKey) {
      throw Error('Commerce public API key not found.');
    }
    
    commerce = new Commerce(publicKey, devEnvironment);
    return commerce;
  }
}
export default getCommerce;