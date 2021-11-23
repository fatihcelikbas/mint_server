export default function Image(props) {
  return (
    <div>
      <img className="w-full" src={props.src} alt={props.alt}/>
    </div>
  )
}