import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute top-0 left-0 object-cover object-center size-full"
      />
      <div className="relative z-10 flex flex-col justify-between p-5 size-full text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 text-xs max-w-64 md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex items-center gap-1 px-5 py-2 overflow-hidden text-xs uppercase bg-black rounded-full cursor-pointer border-hsla w-fit text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="absolute transition duration-300 opacity-0 pointer-events-none -inset-px"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container px-3 mx-auto md:px-10">
      <div className="px-5 py-32">
        <p className="text-lg font-circular-web text-blue-50">
          Enter the Animeverse
        </p>
        <p className="max-w-md text-lg opacity-50 font-circular-web text-blue-50">
          Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of anime worlds converge into an interconnected gaming experience.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="/videos/feature-1.mp4"
          title={
            <>
              Charact<b>e</b>r Guilds
            </>
          }
          description="Join forces with fellow players, form powerful guilds, and conquer challenges together."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="row-span-1 bento-tilt_1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="/videos/feature-2.mp4"
            title={
              <>
                Epic <b>R</b>aids
              </>
            }
            description="Battle legendary bosses and earn exclusive loot in high-stakes raid events."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="row-span-1 bento-tilt_1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="/videos/feature-3.mp4"
            title={
              <>
                Story-dri<b>v</b>en Quests
              </>
            }
            description="Embark on immersive quests that unfold like your favorite anime series."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="/videos/feature-4.mp4"
            title={
              <>
                Custo<b>m</b>izable Avatars
              </>
            }
            description="Create your unique anime-inspired avatar with endless customization options."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex flex-col justify-between p-5 size-full bg-violet-300">
            <h1 className="text-black bento-title special-font max-w-64">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="/videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="object-cover object-center size-full"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
