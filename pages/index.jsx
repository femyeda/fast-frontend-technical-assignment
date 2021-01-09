import { Transition } from "@headlessui/react";
import classnames from "classnames";
import find from "lodash.find";
import reject from "lodash.reject";
import Image from "next/image";
import FastCheckout from "../components/Checkout";

export default function IndexPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [hasSearchQuery, setHasSearchQuery] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    if (searchQuery) {
      fetchMovies(searchQuery);
      setHasSearchQuery(true);
    } else {
      setSearchResults([]);
      setHasSearchQuery(false);
    }
  }, [searchQuery]);

  const [cart, setCart] = React.useState([]);
  const [isCartOpen, setCartOpen] = React.useState(false);

  const inCart = (movie) => {
    return find(cart, ["Title", movie.Title]) ? true : false;
  };

  const toggleCart = (movie) => {
    if (inCart(movie)) {
      removeFromCart(movie);
    } else {
      addToCart(movie);
    }
  };

  const addToCart = (movie) => {
    setCart([movie, ...cart]);
  };

  const removeFromCart = (movie) => {
    setCart(reject(cart, { Title: movie.Title }));
  };

  const Cart = () => {
    return (
      <Transition show={isCartOpen}>
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <section
              className="absolute inset-y-0 right-0 max-w-full flex sm:pl-16"
              aria-labelledby="slide-over-heading"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-background shadow-xl overflow-y-scroll">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <h2
                        id="slide-over-heading"
                        className="text-lg font-medium"
                      >
                        Movies
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          onClick={() => setCartOpen(false)}
                          className="bg-light rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <ul className="divide-y divide-light overflow-y-auto">
                    {cart.map((movie) => {
                      return (
                        <li
                          key={`cart-item-${movie.Title}`}
                          className="px-6 py-5 relative"
                        >
                          <div className="group flex justify-between items-center">
                            <a href="#" className="-m-1 p-1 block">
                              <div
                                className="absolute inset-0"
                                aria-hidden="true"
                              ></div>
                              <div className="flex-1 flex items-center min-w-0 relative">
                                <span className="flex-shrink-0 inline-block relative">
                                  <img
                                    className="h-auto w-10"
                                    src={movie.Poster}
                                    alt=""
                                  />
                                </span>
                                <div className="ml-4 truncate">
                                  <p className="text-sm font-medium truncate">
                                    {movie.Title}
                                  </p>
                                  <p className="text-sm truncate">
                                    {movie.Year}
                                  </p>
                                </div>
                              </div>
                            </a>
                            <div className="ml-2 relative inline-block text-left">
                              <button
                                onClick={() => removeFromCart(movie)}
                                className="group relative w-8 h-8 rounded-full inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                id="options-menu-0"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="sr-only">
                                  Open options menu
                                </span>
                                <span className="flex items-center justify-center h-full w-full rounded-full">
                                  <svg
                                    className="w-5 h-5"
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 512 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M368.5 240h-225c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7h225c8.8 0 16-7.2 16-16s-7.2-16-16-16z"></path>
                                  </svg>
                                </span>
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {cart.length === 0 && (
                    <p className="mt-6 mx-6">Search for a movie to download.</p>
                  )}
                  {cart.length > 0 && (
                    <>
                      <FastCheckoutButton classes="mx-6" />
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </Transition>
    );
  };

  const fetchMovies = (query) => {
    if (!query || query.length < 3) return null;

    fetch(
      `https://www.omdbapi.com/?apikey=${
        process.env.NEXT_PUBLIC_FAST_OMDB_KEY
      }&type=movie&s=${encodeURIComponent(query.trim())}`
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setSearchResults(result?.Search);
      });
  };

  const Movie = ({ movie }) => {
    return (
      <article
        onClick={() => toggleCart(movie)}
        className="mx-auto hover:cursor-pointer relative"
      >
        <button
          className={classnames(
            inCart(movie) ? "text-indigo-500" : "text-white text-opacity-80",
            "transition-all",
            "absolute top-4 right-4 z-10"
          )}
        >
          <svg
            className="w-6 h-6"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z"></path>
          </svg>
        </button>
        {movie.Poster !== "N/A" ? (
          <Image
            src={movie.Poster}
            layout="intrinsic"
            width={300}
            height={444}
          />
        ) : (
          <div
            className="bg-indigo-50"
            style={{
              width: 260,
              height: 344,
            }}
          ></div>
        )}
        <p className="font-thin text-xl text-white">{movie.Title}</p>
        <p className=" font-medium text-sm text-white">{movie.Year}</p>
      </article>
    );
  };

  const Movies = ({ movies }) => {
    if (!movies) {
      return null;
    }

    return movies.map((movie, index) => {
      return <Movie key={`movie-${index}`} movie={movie} />;
    });
  };

  const FastCheckoutButton = ({ classes }) => {
    const [should, setShould] = React.useState(false);
    const confirmCheckout = () => {
      setShould(true);
    };

    const cancel = () => {
      setShould(false);
    };

    return (
      <>
        <div className="relative">
          {should && (
            <div className={classnames("absolute -top-full left-0 space-x-2")}>
              <button
                className={classnames("bg-red-500 py-3 px-2")}
                onClick={cancel}
              >
                <p classes="text-sm font-semibold text-white text-center">
                  cancel
                </p>
              </button>
              <button
                className={classnames("bg-green-500 py-3 px-2")}
                onClick={checkout}
              >
                <p classes="text-sm font-semibold text-white text-center">
                  confirm
                </p>
              </button>
            </div>
          )}
          <button
            onClick={confirmCheckout}
            className={classnames(
              "flex-no-shrink shadow-md text-white text-center bg-indigo-500 hover:bg-indigo-500 hover:border-indigo-500 py-3 px-2",
              classes
            )}
          >
            <p classes="text-sm font-semibold text-white text-center">
              {cart.length > 0
                ? `Fast Checkout (${cart.length} Movies)`
                : "Add movies to your cart to checkout fast 🚀"}
            </p>
          </button>
        </div>
      </>
    );
  };
  const [isProcessing, setProcessing] = React.useState(false);
  const checkout = () => {
    if (cart.length === 0) {
      return;
    }

    setProcessing(true);
    setCartOpen(false);
    setCart([]);
    setSearchResults([]);
    setSearchQuery("");
    setTimeout(() => {
      setProcessing(false);
    }, 3000);
  };

  return (
    <>
      {/* Navigation & Actions */}
      <nav className="py-6 px-6 flex justify-end">
        <button onClick={() => setCartOpen(true)}>
          <svg
            className="w-6 h-6 text-white"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M14 5H2v9a1 1 0 001 1h10a1 1 0 001-1V5zM1 4v10a2 2 0 002 2h10a2 2 0 002-2V4H1z"
              clipRule="evenodd"
            ></path>
            <path d="M8 1.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"></path>
          </svg>
          {cart.length > 0 && (
            <span
              className="absolute top-4 right-4 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-indigo-500"
              aria-hidden="true"
            ></span>
          )}
        </button>
      </nav>

      {/* Title & Search Input */}
      <section
        className={classnames(
          hasSearchQuery ? "pt-2 space-y-2" : "pt-16 space-y-4",
          "transition-all",
          ""
        )}
      >
        <h1
          className={classnames(
            hasSearchQuery ? "text-sm font-semibold" : "font-normal text-4xl",
            "text-center text-gray-300",
            "transition-all"
          )}
        >
          Fast Movies!
        </h1>
        <section
          className={classnames(
            hasSearchQuery ? "" : "",
            "flex justify-center",
            "transition-all"
          )}
        >
          <div className="max-w-lg mt-1 mx-6 lg:mx-36 relative rounded-md shadow-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="text-gray-600"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                aria-hidden="true"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"></path>
              </svg>
            </div>
            <input
              autoFocus={true}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              name="movie"
              id="movie"
              className="bg-light focus:ring-gray-500 focus:border-gray-500 block w-full px-10 sm:text-sm border-gray-300 rounded-full"
            />
            {hasSearchQuery && (
              <button
                className={classnames(
                  hasSearchQuery ? "opacity-100" : "opacity-0",
                  "absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none",
                  "transition-all"
                )}
                onClick={() => setSearchQuery("")}
              >
                <svg
                  className="text-gray-600"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  aria-hidden="true"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z"></path>
                  <path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path>
                </svg>
              </button>
            )}
          </div>
        </section>
      </section>

      {/* Search Results */}
      <section className="flex flex-col space-y-6 md:grid md:grid-cols-2 md:gap-6 max-w-lg mt-6 lg:mx-auto w-full md:space-y-0">
        <Movies movies={searchResults} />
      </section>

      {/* Fast Checkout Bottom Bar */}
      <div className="h-20" />
      <div className={classnames("fixed bottom-0 left-0 right-0", "")}>
        <div className="w-full h-20 sm:max-w-lg p-4 mx-auto text-center ">
          <FastCheckoutButton classes="w-full h-full" />
        </div>
      </div>

      <Cart />
      <FastCheckout isOpen={isProcessing} />
    </>
  );
}
