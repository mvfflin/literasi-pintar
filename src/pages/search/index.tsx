import Navbar from "@/components/navbar";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiSearch } from "react-icons/bi";
import LoadingIcons from "react-loading-icons";

const SearchPage = () => {
  const router: NextRouter = useRouter();
  const [books, setBooks] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const { search, page }: any = router.query;

  const nextPage = () => {
    const pageInt = parseInt(page);
    const nextpage = Math.floor(pageInt + 1).toString();
    if (!page) {
      return (window.location.href =
        `${window.location.origin}/search?` +
        new URLSearchParams({ search: search, page: "2" }).toString());
    }

    const maxPage = Math.floor(page * 100);
    if (maxPage > books.num_found) {
      toast.error(`Hanya ada sampai halaman ke ${page}`, {
        position: "top-right",
      });
      return "";
    }

    return (window.location.href =
      `${window.location.origin}/search?` +
      new URLSearchParams({ search: search, page: nextpage }).toString());
  };

  const previousPage = () => {
    if (!page || parseInt(page) == 1) {
      toast.error("Kamu sedang berada di halaman paling awal!", {
        position: "top-right",
      });
      return "";
    } else if (parseInt(page) == 2) {
      return (window.location.href =
        `${window.location.origin}/search?` +
        new URLSearchParams({ search: search }).toString());
    }
    const pageInt = parseInt(page);
    const prevpage = Math.floor(pageInt - 1).toString();
    return (window.location.href =
      `${window.location.origin}/search?` +
      new URLSearchParams({ search: search, page: prevpage }).toString());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (!search || !router.isReady) {
      setBooks(null);
    } else {
      setSearchInput(search);
      const getBooks = async () => {
        let urlParam =
          `https://openlibrary.org/search.json?` +
          new URLSearchParams({ title: search }).toString();
        if (!page) {
          urlParam = urlParam;
        } else {
          urlParam =
            `https://openlibrary.org/search.json?` +
            new URLSearchParams({ title: search, page: page }).toString();
        }
        setLoading(true);
        try {
          fetch(urlParam).then(async (res) => {
            const data = await res.json();
            setBooks(data);
            setLoading(false);
          });
        } catch (error) {
          setBooks("error");
          setLoading(false);
        }
      };
      getBooks();
    }
  }, [search, router.isReady, page]);

  return (
    <>
      <Toaster />
      <Navbar />
      <main className="max-w-screen h-max">
        <div className="main px-5 my-52">
          <div className="title text-center mt-52 justify-center">
            <h1 className="text-3xl font-semibold">Cari sebuah buku...</h1>
            <div className="flex justify-center mt-5">
              <form action={"/search"} method="get">
                <input
                  className="input"
                  type="text"
                  placeholder="Harry Potter and the Sorcerer's Stone"
                  name="search"
                  id="search"
                  value={searchInput}
                  onChange={handleChange}
                />
                <button className="ml-4 btn-primary m-0" type="submit">
                  <BiSearch />
                </button>
              </form>
            </div>
            {books != "error" && books != null && books.docs.length > 0 ? (
              <>
                <h1 className="mt-2 text-xl">
                  Hasil pencarian buku dengan judul : {search} ({books.numFound}{" "}
                  hasil)
                </h1>
              </>
            ) : null}
          </div>

          <div className="mt-24">
            {router.query.search == null ? (
              <>
                <h1 className="text-5xl text-center">
                  Cari buku yang kamu sukai di search bar!
                </h1>
              </>
            ) : (
              <>
                {books != "error" && books != null && books.docs.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 justify-center gap-5 text-center">
                      {books.docs.map((doc: any) => {
                        return (
                          <div key={doc.key} className="p-5 bg-neutral-800">
                            <img
                              alt={doc.title}
                              className="mx-auto w-[200px] h-[300px]"
                              src={
                                doc.isbn
                                  ? `http://covers.openlibrary.org/b/isbn/${doc.isbn?.[0]}-M.jpg`
                                  : "https://placehold.co/200x300"
                              }
                            />
                            <h1 className="text-2xl font-bold mt-5">
                              {doc.title}
                            </h1>
                            <h1>
                              Author(s) :{" "}
                              {doc.author_name != null || undefined
                                ? doc.author_name.map(
                                    (name: any, index: any) => {
                                      if (
                                        doc.author_name.length ===
                                        index + 1
                                      ) {
                                        return `${name}.`;
                                      }
                                      return `${name}, `;
                                    }
                                  )
                                : "Tidak ada author"}
                            </h1>
                            <Link href={""}>
                              <button className="btn-primary mt-5">
                                Lihat buku
                              </button>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex mx-auto mt-12 w-max gap-5">
                      <button onClick={previousPage} className="btn-primary">
                        &lt;
                      </button>
                      <h1 className="text-3xl bg-gray-800 w-max p-5 rounded-md">
                        {page ? page : "1"}
                      </h1>
                      <button onClick={nextPage} className="btn-primary">
                        &gt;
                      </button>
                    </div>
                  </>
                ) : books == "error" ? (
                  <>
                    <h1>Terjadi suatu kesalahan! Harap hubungi admin.</h1>
                  </>
                ) : null}
                {loading ? (
                  <>
                    <div className="mx-auto w-full text-center">
                      <LoadingIcons.Puff className="mx-auto scale-[2]" />
                      <h1 className="mt-5 text-xl">Mohon tunggu...</h1>
                    </div>
                  </>
                ) : null}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchPage;
