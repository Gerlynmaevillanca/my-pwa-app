import { useEffect, useRef, useState } from "react";

const API_KEY = "3ae4907c";

function Banner() {
  const sliderRef = useRef(null);
  const [movieImages, setMovieImages] = useState([]);

  useEffect(() => {
    const popularTitles = [
      "Avengers",
      "Inception",
      "The Dark Knight",
      "Interstellar",
      "Joker",
      "Spider-Man",
      "Iron Man",
      "Black Panther",
      "Frozen",
      "Titanic",
      "Avatar",
      "Guardians of the Galaxy",
      "Doctor Strange",
      "Captain America",
      "Thor",
      "Wonder Woman",
      "Deadpool",
      "The Batman",
      "Shang-Chi",
    ];

    const fetchPosters = async () => {
      const posters = [];
      for (const title of popularTitles) {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`
          );
          const data = await res.json();
          if (data.Poster && data.Poster !== "N/A") {
            posters.push(data.Poster);
          }
        } catch (err) {
          console.error("Error fetching:", title, err);
        }
      }

      // Duplicate posters for seamless infinite scroll
      const doubled = [...posters, ...posters];
      setMovieImages(doubled);
    };

    fetchPosters();
  }, []);

  useEffect(() => {
    if (!sliderRef.current || movieImages.length === 0) return;

    const slider = sliderRef.current;
    let scrollPos = 0;
    const speed = 0.5;
    let animationFrame;

    const scroll = () => {
      scrollPos += speed;
      if (scrollPos >= slider.scrollWidth / 2) scrollPos = 0;
      slider.scrollLeft = scrollPos;
      animationFrame = requestAnimationFrame(scroll);
    };

    const start = setTimeout(() => {
      animationFrame = requestAnimationFrame(scroll);
    }, 800); // small delay to ensure layout ready

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(start);
    };
  }, [movieImages]);

  if (movieImages.length === 0) {
    return (
      <div className="w-full h-72 flex items-center justify-center bg-linear-to-r from-pink-50 to-purple-50">
        <p className="text-gray-500">Loading popular movies...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-linear-to-r from-pink-50 to-purple-50 py-4">
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll whitespace-nowrap scrollbar-hide"
      >
        {movieImages.map((img, index) => (
          <div
            key={index}
            className="inline-block w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] shrink-0 px-2"
          >
            <div className="rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
              <img
                src={img}
                alt={`Movie ${index}`}
                className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* cinematic fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-pink-50 via-pink-50 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-purple-50 via-purple-50 to-transparent pointer-events-none"></div>
    </div>
  );
}

export default Banner;
