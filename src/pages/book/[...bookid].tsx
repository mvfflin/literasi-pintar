import { CoverSlider } from "@/components/book/slider";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Bars } from "react-loading-icons";

type Props = {
  data?: Object;
};

const BookPreview = ({ data }: Props) => {
  const router = useRouter();
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<any>(null);
  const bookId = router.query.bookid as string[];
  let bookIdInt;
  if (bookId) {
    bookIdInt = parseInt(bookId?.toString());
  }

  useEffect(() => {
    setLoading(true);
    setBook(data);
    setLoading(false);
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>{(data as any).title}</title>
        <meta name="og:title" content={(data as any).title} />
        <meta
          name="og:description"
          content={
            (data as any).description
              ? (data as any).description.value
              : `Eksplor lebih lanjut tentang buku ${(data as any).title}`
          }
        />
      </Head>
      <main className="h-auto">
        <div className="main px-5 my-52">
          {loading == true ? (
            <>
              <Bars className="mx-auto" />
              <h1 className="text-2xl text-center">Mohon tunggu...</h1>
            </>
          ) : null}
          {book != null && loading == false ? (
            <>
              <h1 className="text-3xl lg:text-5xl text-center my-5 font-bold">
                Informasi Buku
              </h1>
              <div className="p-10 bg-slate-900">
                <div className="lg:grid lg:grid-cols-2 gap-5">
                  {book.covers ? (
                    <div className="bg-neutral-700 p-5 mb-5 lg:mb-0">
                      <CoverSlider bookArray={book.covers} />
                    </div>
                  ) : null}
                  <div>
                    <h1 className="text-5xl font-bold">{book.title}</h1>
                    <h1 className="text-xl mt-5 break-all">
                      {book.description ? book.description.value : null}
                    </h1>
                    <h1 className="text-2xl mt-5 font-semibold">Authors : </h1>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const router = useRouter();
  const { query } = context;
  const bookId = query.bookid as string[];
  console.log(bookId);
  var props: Props = {};
  // Fetch data from external API
  console.log(`https://openlibrary.org/${bookId?.join("/")}.json`);
  const response = await fetch(
    `https://openlibrary.org/${bookId?.join("/")}.json`
  );

  const data = await response.json();
  props.data = data;

  console.log(bookId);
  // Pass data to the page via props
  return { props: props };
};

export default BookPreview;
