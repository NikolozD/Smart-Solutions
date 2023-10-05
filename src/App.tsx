import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "./@/components/ui/table";
import "./App.css";
import UserTableRow from "./UserTableRow";
import { UserContext } from "../UserContext";
import { Toaster } from "./@/components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./@/components/ui/skeleton";
import Pagination from "./Pagination";

function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  //   const [usersPerPage] = useState(1);
  const usersPerPage = 10;

  const navigate = useNavigate();

  const updateUserByIndex = (user, index) => {
    const newUsers: Array<any> = [...users];
    newUsers[index] = user;
    setUsers(newUsers);
  };
  const deleteUserByIndex = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };
  const userContext = {
    setUsers: setUsers,
    users: users,
    updateUserByIndex: updateUserByIndex,
    deleteUserByIndex: deleteUserByIndex,
  };

  const handleClick = (id) => {
    navigate(`/users/${id}`, { replace: true });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  return (
    <>
      {users ? (
        <>
          <UserContext.Provider value={userContext}>
            <Toaster />
            <Table className="font-mono text-lg bg-gray-200 shadow-xl rounded-xl p-30 w-50">
              <TableCaption>
                <Pagination
                  usersPerPage={usersPerPage}
                  totalUsers={users.length}
                  paginate={paginate}
                />
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>City</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user, index) => (
                  <UserTableRow
                    user={user}
                    index={index}
                    key={user.id}
                    onClick={handleClick}
                  />
                ))}
              </TableBody>
            </Table>
          </UserContext.Provider>{" "}
        </>
      ) : (
        <div className="space-y-2 mt-20">
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
          <Skeleton className="h-[40px] bg-gray-500 w-[1000px]" />
        </div>
      )}
    </>
  );
}

export default App;
