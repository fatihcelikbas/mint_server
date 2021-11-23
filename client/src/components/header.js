export default function Header(props) {
  return (
    <div className="flex flex-row items-center justify-between mb-10">
      <header className="mb-0 block">
        <h1 className="flex flex-row items-end m-0 text-5xl leading-tight font-bold tracking-tight">
          <div className="mr-4 w-24 h-24 relative inline-block overflow-hidden">
            <img src={props.img} alt="CryptoKnigtz" className="w-full h-full
             object-cover absolute top-0 left-0 opacity-1 transition-opacity duration-500 ease-in delay-0"/>
          </div>
          <a aria-current="page" href="/">CRYPTOKNIGHTZ</a>
        </h1>
      </header>
    </div>
  )
}