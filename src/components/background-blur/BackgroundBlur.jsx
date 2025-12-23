import './BackgroundBlur.css'

export default function BackgroundBlur({ cartOpen, OpenCart}) {
    return (
        <div className={`background-blur tra ${cartOpen ? '' : 'hide'}`} onClick={OpenCart}></div>
    )
}