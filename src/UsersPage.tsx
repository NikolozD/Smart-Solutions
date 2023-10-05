import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton } from "./@/components/ui/skeleton";
import { Button } from "./@/components/ui/button";

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function UsersPage() {
  const [user, setUser] = useState<IUser>();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
  };

  function handleClick() {
    navigate("/users", { replace: true });
  }
  return (
    <main className="container bg-gray-200 w-full md:w-96 m-auto h-[640px] p-2 align-middle rounded-lg shadow-lg">
      {user ? (
        <>
          <div className="container p-0 text-xl w-full h-full m-0 flex md:text-3xl flex-wrap flex-col  gap-y-1.5  gap-x-2.5">
            <div className="flex  w-full rounded-md basis-2/12">
              <Button onClick={handleClick} className=" bg-black basis-1/12">
                Back
              </Button>
              <h1 className="font-mono  basis-10/12 font-bold text-2xl">
                User Details
              </h1>
            </div>

            <div className="container font-mono basis-9/12  flex   p-5 h-[200px] gap-y-1 flex-col  rounded-lg ">
              <div className="basis-5/12 flex flex-col items-start">
                <p className="font-semibold text-left"> {user.name} </p>
                <p className="text-left">✉️:{user.email} </p>
                <p className="text-left"> ☎:{user.phone} </p>
              </div>
              <div className="basis-2/6 flex flex-col text-left items-start ">
                <p className="font-semibold ">Address:</p>
                <p className="text-left"> {user.address.city} </p>
                <p className="text-left">
                  {user.address.street}, {user.address.suite}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Skeleton className="h-4  w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      )}
    </main>
  );
}
