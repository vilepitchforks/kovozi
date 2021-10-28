import { Logout, Privacy } from "../components/UtilityLinks/UtilityLinks";

const Dashboard = () => {
  return (
    <>
      <div className="md:hidden">
        <Privacy />
      </div>
      <div>
        <Logout />
      </div>
    </>
  );
};

export default Dashboard;
