import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "../hooks/useClickOutside";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  description: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = React.useState(false);
  const [canScrollDown, setCanScrollDown] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTop = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = carouselRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight);
    }
  };

  const scrollUp = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ top: -300, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ top: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardHeight = 300; // Example card height
      const gap = 16; // Example gap between cards
      const scrollPosition = (cardHeight + gap) * (index + 1);
      carouselRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-10/12 h-full mx-auto">
        <div
          className="flex flex-col w-full overflow-y-scroll overscroll-y-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute bottom-0 z-[1000] w-auto h-[5%] overflow-hidden bg-gradient-to-t"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-col justify-start gap-4 pl-4",
              "max-h-screen mx-auto", // Adjust max height as needed
              "w-4/5"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pb-[5%] md:last:pb-[33%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
  onClick,
}: {
  card: Card;
  index: number;
  layout?: boolean;
  onClick?: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card from opening
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-customone h-fit z-[60] my-10 md:p-10 rounded-3xl font-sans relative font-bold"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-bold mt-4 text-customfive uppercase"
              >
                {card.title}
              </motion.p>
              <div className="pt-5 mx-auto text-zinc-300 font-semibold max-w-full ">
                {card.description}
              </div>
              <div className="py-10 text-customfour">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative rounded-3xl bg-gray-100 dark:bg-neutral-900 w-full h-[15rem] overflow-hidden flex items-start justify-start"
        style={{ maxWidth: "100%" }} // Ensure full width utilization
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black z-30" />
        <div className="relative flex items-start justify-start w-full h-full">
          <div className="relative w-full h-full">
            <BlurImage
              src={card.src}
              alt={card.title}
              fill
              className="object-fit
               w-3/4 h-3/4 absolute inset-0" // Adjusted width and height
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-20" />
          <div className="relative z-30 p-8 max-w-lg"></div>
          <div className="absolute right-0 top-0 bottom-0 bg-black text-customfive p-4 shadow-md bg-opacity-20 flex flex-col items-center justify-center z-40 w-5/12">
            <p className="text-3xl mb-4 bold uppercase">{card.title}</p>{" "}
            {/* Added margin-bottom for spacing */}
            <button
              className="px-3 py-2 bg-green-600 text-white rounded-lg transition-transform duration-200 hover:scale-110 uppercase"
              onClick={handleApplyClick}
            >
              Apply
            </button>
          </div>
        </div>
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300 w-1/2",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
