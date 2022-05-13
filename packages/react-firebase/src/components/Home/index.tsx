import { useContextAuth } from "../../hook";

export const Home = () => {
  const { user, logout, loading } = useContextAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-with rounded shadow-md px-8 pt-6 pb-4 mb-8">
        <h1 className="text-xl mb-4">
          Welcome {user.email} {user.displayName}{" "}
        </h1>

        <button
          className="bg-blue hover:bg-blue-700 text-with font-bold py-2 px-4 rounded focus:outline-none focus:shadow-uotline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
