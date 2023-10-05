export default function Pagination({ usersPerPage, totalUsers, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="flex justify-center w-1/2">
        {pageNumbers.map((number) => (
          <li
            className="basis-1/12 hover:cursor-pointer hover:font-semibold"
            key={number}
          >
            <p onClick={() => paginate(number)}>{number}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
