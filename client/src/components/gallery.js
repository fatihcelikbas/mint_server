export default function Gallery(props) {
  return (
    <div className="flex w-full space-x-4">
      { props.images.map(image => 
        <img className="w-4/12 h-auto" src={image.src} alt={image.title} key={image.title}/>
      )} 
    </div>
  )
}