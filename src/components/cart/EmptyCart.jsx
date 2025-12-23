import { addItem } from '../../cartStorage'
import JarPhoto from '../../assets/cart-jar-photo.webp'

export default function EmptyCart() {
    function handleAdd() {
        addItem({
            id: 'tallow-honey-moisturiser',
            name: 'Tallow & Honey Moisturiser',
            price: 26.95,
            image: JarPhoto
        })
    }

    return (
        <div className="f-col empty-cart-wrap flex j-c a-c cen g16">
            <p className="gant empty-cart-heading">
                No items in cart, Start with <br />our new moisturiser.
            </p>

            <button
                className="button-main"
                onClick={handleAdd}
            >
                Add To Cart
            </button>
        </div>
    )
}
