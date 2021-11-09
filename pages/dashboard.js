import { Logout, Privacy, Demo } from "../components/UtilityLinks/UtilityLinks";

const Dashboard = () => {
  return (
    <>
      <div>
        <Demo />
      </div>
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
