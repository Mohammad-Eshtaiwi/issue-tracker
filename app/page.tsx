import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  let currentPage = parseInt(searchParams.page);
  if (isNaN(currentPage)) currentPage = 1;
  return (
    <>
      <div>Hello World</div>
      <Pagination itemCount={100} pageSize={10} currentPage={currentPage} />
    </>
  );
}
