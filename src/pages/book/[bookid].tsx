import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Bars } from "react-loading-icons";

const BookPreview = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<any>(null);
  const bookId = router.query.bookid;
  let bookIdInt;
  if (bookId) {
    bookIdInt = parseInt(bookId?.toString());
  }

  useEffect(() => {
    setLoading(true);
    try {
      fetch("https://openlibrary.org/works/OL45804W.json").then(async (res) => {
        const data = await res.json();
        setLoading(false);
        console.log(data);
        setBook(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <main className="max-w-screen h-max">
        <div className="main px-5 my-52">
          {loading == true ? (
            <>
              <Bars className="mx-auto" />
              <h1 className="text-2xl text-center">Mohon tunggu...</h1>
            </>
          ) : null}
          {book != null && loading == false ? (
            <>
              <div className="m-52 p-7 bg-slate-900">
                <div className="grid grid-cols-2">
                  <div>
                    <h1 className="text-5xl">{book.title}</h1>
                    <h1 className="text-3xl">{book.description}</h1>
                    <h1 className="text-xl">Authors : </h1>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </main>
    </>
  );
};

export default BookPreview;
