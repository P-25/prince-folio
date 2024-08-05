// components
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Software Developer</span>
            <h1 className="h1 mb-6">
              Hello, <br /> I'm <span className="text-accent">Prince</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              Welcome to my digital realm, <br />
              Where imagination meets creation!
              <br /> With a sharp sense for design and a dedicated command of
              coding, my portfolio illustrates my commitment to excellence.
            </p>
            {/* btn and socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a href="/assets/Luis-Solar-CV.pdf" download>
                <Button
                  variant="outline"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download CV</span>
                </Button>
              </a>
              {/* <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div> */}
            </div>
          </div>
          {/* photo */}
          {/* <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div> */}
        </div>
        {/* <Stats /> */}
      </div>
    </div>
  );
};

export default Home;
