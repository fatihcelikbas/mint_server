import Title from '../components/title';
import Text from '../components/text';
import Image from '../components/image';
import Header from '../components/header';
import Gallery from '../components/gallery';
import banner from '../images/banner.gif';
import titleImage from '../images/favicon.png';

// Gallery images
import chubby1 from '../images/chubby-1.gif';
import chubby2 from '../images/chubby-2.gif';
import chubby3 from '../images/chubby-3.gif';
import Wallet from '../components/wallet';


function Home() {
  return (
    <div class="container w-full md:max-w-2xl mx-auto py-10 px-5 font-custom">
      <Wallet />
      <Header img={titleImage} />
      <Title>What are CryptoKnightz?</Title>
      <Text>
        Cryptoknightz is a community-first NFT collectibles project. The collection includes 10,000 brave, spartan, cute and, most importantly, unique knights! 
      </Text>   
      <Image src={banner} alt="Banner" /> 
      <Title>Specs</Title>
      <Text>
        Each Cryptoknight is a programmatically generated 64x64 image, stored as an ERC721 token on the Ethereum blockchain. Each one is carefully crafted from more than 10 properties. CyptoKnightz can be minted for 0.069 eth. 
      </Text>
      <Gallery images={ [ {src: chubby1, title: "Chubby 1"}, {src: chubby2, title: "Chubby 2"}, {src: chubby3, title: "Chubby 3"} ]} />
      <Title>Story</Title>
      <Text>
      Cryptoknights live in digital Greek lands built on the Ethereum blockchain. There are four houses: Spartus, Gladius, Atredius and Ogrius. Mint your CryptoKnight to see which house you are a part of. Join our discord community to decide on how the story will evolve. 
      </Text>
      <Title>Why buy a CryptoKnight?</Title>
      <Text>
        1. Each cryptoknight is cute and original, simply beautiful as a piece of art. If you agree with us, you may just be passionate about displaying your knight in your metaverse art gallery. 
        <p>
          2. Cryptoknightz is a bet in the future of blockchain and NFTs. As the community of blockchain builders grow, we believe a new decentralized future is being unlocked. NFTs can serve as the building block of this new world. When one day blockchain and NFTs are widely adopted, we think people will search and value first and most original NFT projects: first-ever collectible project, first-ever animated collectible project, first-ever cute collectible project... 
          If you share this vision, buying a Cyrptoknight would be your ticket to the first-ever medieval knights collection. </p> 
        <p>
          3. Cryptoknightz intends to be fully decentralized. When we say community-first, we mean it. If the community gains momentum, some of the members could be elected as moderators, helping the community decide on its own future. 
        </p>
      </Text>
      <Title>Why should you think carefully before buying a CryptoKnight?</Title>
      <Text>
        While the future is exciting, it is still very early days for NFTs. The way the world sees NFTs and blockchain can evolve significanly, and existing community-first collectible tokens may have zero financial value in the future. Given these risks, we think you should buy a CryptoKnight only if you have extra money for art and collectibles.  
      </Text>
      <Title>Team</Title>
      <Text>
          @marcusaurelius: Blockchain developer. 
          <p>
          @maximusdecimusmeridius: NFT collector. </p>
      </Text>
      <footer>© 2021, Chubbies NFT LLC, <a href="/terms" className="underline">Terms of Use</a> </footer>
    </div>
  );
}

export default Home;
