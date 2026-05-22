
 import { useRef, useState } from "react";
import videofile from "../../assets/videos/video-test-1.mp4" 

const Videoshow = () => {
 

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {

    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };
   
  return (
  <section id="promo-video-section" className="w-full bg-[#f6f7fa]">
      <div className="w-full mx-auto">
        <div
          id="promo-vid-wrapper"
          className="relative w-full h-[70vh] overflow-hidden bg-black group cursor-pointer"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            loop
          >
            <source src={videofile} type="video/mp4"/>
          </video>

           {/* Dark Overlay  */}
          <div
            className="promo-overlay absolute inset-0 transition-colors duration-500 pointer-events-none group-hover:bg-black/40"
          ></div>

          <button
             onClick={toggleVideo}
            // id="promo-vid-trigger"
            aria-label="Toggle promotional video"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white text-[#17294b] shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex items-center justify-center transition-all duration-500 hover:scale-110 z-10"
          >{isPlaying?( <i
              className="icon-play fa-solid fa-pause text-xl md:text-2xl lg:text-3xl ml-1 lg:ml-2 absolute transition-all duration-500"
            ></i>):( <i
              className="icon-pause fa-solid fa-play text-xl md:text-2xl lg:text-3xl absolute transition-all duration-500"
            ></i>)}
           

           
          </button>
        </div>
      </div>
    </section>
  )
}

export default Videoshow