import {Card,Button, Image} from "react-bootstrap"

const ProductCard = ({product,quantity=0,changeQuantityInCart,showRemove=false})=>{

    const addOne = ()=>{
        changeQuantityInCart(product.id,quantity+1)
    }

    const subtractOne = ()=>{
        if(quantity>1){
        changeQuantityInCart(product.id,quantity -1)
        }
        else{
            removeItem()
        }
    }

    const removeItem = ()=>{
        console.log("here")
        changeQuantityInCart(product.id,null)
    }

    return <Card >
    <Card.Img className="mx-auto"  style={{maxWidth:"4rem"}} variant="top" src={product.image} />
    <Card.Body>
      <Card.Title className="text-truncate">{product.title}</Card.Title>
      <Card.Text>
        ${product.price}
      </Card.Text>
      {quantity<=0  ? 
      (<Button onClick={addOne}>Add </Button>):
       (<><Button size="sm" onClick={subtractOne}>-</Button>
       <span class="badge pill text-danger">{quantity}</span>
       <Button size="sm" onClick={addOne}>+</Button></>)
      }
      {showRemove ? <Button size="sm" variant="danger" onClick={removeItem} className="ms-2">Remove item</Button> :null}
    </Card.Body>
  </Card>
}

export default ProductCard